'use strict';

const authService = require('./auth.service');
const ApiResponse = require('../../shared/utils/ApiResponse');
const asyncHandler = require('../../shared/utils/asyncHandler');
const { HTTP_STATUS } = require('../../shared/constants/httpStatus');
const { MESSAGES } = require('../../shared/constants/messages');
const config = require('../../database/config');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};

const setTokenCookies = (res, tokens) => {
  if (tokens.accessToken) {
    res.cookie('accessToken', tokens.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15 mins
  }
  if (tokens.refreshToken) {
    res.cookie('refreshToken', tokens.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
  }
};

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */
class AuthController {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     tags: [Auth]
   *     summary: Register a new user
   *     security: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [firstName, lastName, email, password]
   *             properties:
   *               firstName: { type: string }
   *               lastName:  { type: string }
   *               email:     { type: string, format: email }
   *               password:  { type: string, minLength: 8 }
   *     responses:
   *       201: { description: User registered }
   *       409: { description: Email already taken }
   */
  register = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);
    res.status(HTTP_STATUS.CREATED).json(
      ApiResponse.success({ id: user.id, email: user.email }, MESSAGES.REGISTER_SUCCESS),
    );
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const meta = { ip: req.ip, userAgent: req.headers['user-agent'] };
    const { user, tokens } = await authService.login(email, password, meta);
    
    setTokenCookies(res, tokens);
    
    res.status(HTTP_STATUS.OK).json(
      ApiResponse.success({ user }, MESSAGES.LOGIN_SUCCESS),
    );
  });

  refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(ApiResponse.error('Refresh token required'));
    }
    const { tokens } = await authService.refreshToken(refreshToken);
    
    setTokenCookies(res, tokens);

    res.status(HTTP_STATUS.OK).json(
      ApiResponse.success(null, MESSAGES.TOKEN_REFRESHED),
    );
  });

  verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    await authService.verifyEmail(token);
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(null, MESSAGES.EMAIL_VERIFIED));
  });

  /**
   * @swagger
   * /auth/verify-email:
   *   post:
   *     tags: [Auth]
   *     summary: Verify if a Microsoft account email exists
   *     security: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [email]
   *             properties:
   *               email: { type: string, format: email, example: "user@example.com" }
   *     responses:
   *       200: 
   *         description: User authorized
   *       404: 
   *         description: User not authorized
   */
  verifyEmailExists = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const meta = { ip: req.ip, userAgent: req.headers['user-agent'] };

    const result = await authService.ssoLogin(email, meta);

    if (result) {
      setTokenCookies(res, result.tokens);
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'User authorized and logged in via SSO',
        data: { 
          authorized: true, 
          email,
          user: result.user
        }
      });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not authorized',
        data: { authorized: false }
      });
    }
  });

  forgotPassword = asyncHandler(async (req, res) => {
    await authService.forgotPassword(req.body.email);
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(null, MESSAGES.PASSWORD_RESET_EMAIL_SENT));
  });

  resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(null, MESSAGES.PASSWORD_RESET_SUCCESS));
  });

  logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user.id);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(null, MESSAGES.LOGOUT_SUCCESS));
  });

  getMe = asyncHandler(async (req, res) => {
    res.status(HTTP_STATUS.OK).json(
      ApiResponse.success(req.user, MESSAGES.USER_FETCHED),
    );
  });
}

module.exports = new AuthController();
