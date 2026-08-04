import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

// ============================================================
// ContextHeader — SAP Fiori page header pattern
// Breadcrumb + Page Title + Actions
// Sticky below the 64px shell header (top-16)
// ============================================================

export interface ContextAction {
  label:    string;
  icon?:    React.ReactNode;
  onClick:  () => void;
  variant?: 'primary' | 'outlined' | 'ghost' | 'danger';
  disabled?: boolean;
  title?:   string;
}

interface ContextHeaderProps {
  title:        string;
  breadcrumbs?: string[];
  subtitle?:    string;
  actions?:     ContextAction[];
  /** Optional filter bar, tab switcher, etc. rendered below title row */
  children?:    React.ReactNode;
}

const ACTION_STYLES: Record<string, string> = {
  primary:  'bg-[var(--brand-maroon)] text-white border-[var(--brand-maroon)] hover:bg-[#5E0C0C] shadow-sm',
  outlined: 'bg-white text-[#1C1C1E] border-[#E8E0C8] hover:bg-[#F5F0DC] hover:border-[#D5CCAC]',
  ghost:    'bg-transparent text-[#6B7280] border-transparent hover:bg-[#F5F0DC] hover:text-[#1C1C1E]',
  danger:   'bg-white text-[#B91C1C] border-[#FECACA] hover:bg-[#FEF2F2]',
};

export const ContextHeader: React.FC<ContextHeaderProps> = ({
  title,
  breadcrumbs = [],
  subtitle,
  actions = [],
  children,
}) => {
  return (
    <div className="bg-[#FEFCCF] border-b border-[#E2BFB9] px-8 py-5 sticky top-16 z-30 print-hide">
      {/* Breadcrumb navigation */}
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-1 mb-2"
        >
          <Link
            to="/dashboard"
            className="flex items-center text-[#9CA3AF] hover:text-[var(--brand-maroon)] transition-colors"
            title="Dashboard"
          >
            <Home className="h-3 w-3" />
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <ChevronRight className="h-3 w-3 text-[#D0D0D0] shrink-0" />
              <span
                className={`text-[12px] ${
                  i === breadcrumbs.length - 1
                    ? 'text-[#374151] font-medium'
                    : 'text-[#9CA3AF]'
                }`}
              >
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title row */}
      <div className="flex items-center justify-between gap-4 min-h-[36px]">
        <div className="min-w-0">
          <h1 className="text-[28px] font-semibold text-[#570000] leading-tight truncate tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[12px] text-[#9CA3AF] mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Action buttons (right-aligned, SAP pattern) */}
        {actions.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                disabled={action.disabled}
                title={action.title}
                className={`
                  inline-flex items-center gap-1.5
                  h-9 px-3.5 text-[13px] font-medium rounded-md border
                  transition-colors duration-100
                  ${ACTION_STYLES[action.variant ?? 'outlined']}
                  ${action.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
                `}
              >
                {action.icon && (
                  <span className="[&>svg]:h-3.5 [&>svg]:w-3.5 shrink-0">{action.icon}</span>
                )}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sub-content: filter bar, tabs, secondary info, etc. */}
      {children && (
        <div className="mt-4 pt-4 border-t border-[#E2BFB9]">
          {children}
        </div>
      )}
    </div>
  );
};

export default ContextHeader;
