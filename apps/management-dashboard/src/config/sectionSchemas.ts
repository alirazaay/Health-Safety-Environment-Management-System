import {
  DEPARTMENTS,
  INCIDENT_CATEGORIES,
  HAZARD_CATEGORIES,
  ROOT_CAUSES,
  RISK_RATINGS,
  STATUSES
} from './constants';

export interface ColumnSchema {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'datetime' | 'select' | 'textarea' | 'file';
  options?: string[];
  required?: boolean;
  readonly?: boolean;
  hideFromForm?: boolean;
  section?: string;
  placeholder?: string;
  compute?: (formData: any, allEntries?: any[]) => string | number;
}

export interface SectionConfig {
  id: string;
  title: string;
  path: string;
  accentColor: string;
  icon: string;
  columns: ColumnSchema[];
}

export const hazardReportingSchema: SectionConfig = {
  id: 'hazard-reporting',
  title: 'Hazard Reporting',
  path: '/hazard-reporting',
  accentColor: '#8C1D2B',
  icon: 'AlertTriangle',
  columns: [
    { key: 's_no', label: 'S#', type: 'text', hideFromForm: true, compute: d => d.s_no || '' },
    { key: 'date', label: 'Date', type: 'date', required: true, section: 'Basic Information' },
    {
      key: 'month',
      label: 'Month',
      type: 'text',
      readonly: true,
      section: 'Basic Information',
      compute: (data: any) => {
        if (!data.date) return '';
        const d = new Date(data.date);
        return d.toLocaleString('default', { month: 'short', year: 'numeric' });
      }
    },
    { key: 'department_id', label: 'Department', type: 'select', options: DEPARTMENTS, required: true, section: 'Basic Information' },
    { key: 'location', label: 'Location', type: 'text', required: true, section: 'Basic Information' },
    { key: 'originator', label: 'Reported By', type: 'text', required: true, section: 'Basic Information' },
    { key: 'hazard_category_id', label: 'Hazard Category', type: 'select', options: HAZARD_CATEGORIES, required: true, section: 'Hazard Details' },
    { key: 'description', label: 'Hazard Details', type: 'textarea', required: true, section: 'Hazard Details' },
    { key: 'unsafe_type', label: 'Type of Hazard', type: 'select', options: ['Unsafe Act', 'Unsafe Condition', 'Unsafe Environment', 'Unsafe Equipment'], section: 'Hazard Details' },
    { key: 'person_name', label: 'Person Name', type: 'text', section: 'Hazard Details' },
    { key: 'person_category', label: 'Person Type', type: 'select', options: ['Employee', 'Contractor', 'Visitor', 'Other'], section: 'Hazard Details' },
    { key: 'corrective_action', label: 'Corrective Action', type: 'textarea', section: 'Corrective Actions' },
    { key: 'responsible_person', label: 'Responsible Person', type: 'text', required: true, section: 'Assignment' },
    { key: 'target_date', label: 'Target Date', type: 'date', section: 'Assignment' },
    { key: 'risk_rating_id', label: 'Risk Rating', type: 'select', options: RISK_RATINGS, required: true, section: 'Assignment' },
    { key: 'contractor_name', label: 'Contractor Name', type: 'text', section: 'Assignment' },
    { key: 'contractor_company', label: 'Contractor Company', type: 'text', section: 'Assignment' },
    { key: 'status_id', label: 'Status', type: 'select', options: STATUSES, required: true, section: 'Assignment' },
    { key: 'initial_photo', label: 'Initial Photo', type: 'file', section: 'Attachments' },
    { key: 'additional_photos', label: 'Additional Photos', type: 'file', section: 'Attachments' },
    { key: 'closing_proof_photo', label: 'Closing Proof Photo', type: 'file', section: 'Attachments' },
    { key: 'remarks', label: 'Remarks', type: 'textarea', section: 'Corrective Actions' }
  ]
};

export const nearMissSchema: SectionConfig = {
  id: 'near-miss',
  title: 'Near Miss',
  path: '/near-miss',
  accentColor: '#D9A441',
  icon: 'Target',
  columns: [
    { key: 's_no', label: 'S#', type: 'text', hideFromForm: true, compute: d => d.s_no || '' },
    { key: 'date', label: 'Date', type: 'date', required: true, section: 'Basic Information' },
    {
      key: 'month',
      label: 'Month',
      type: 'text',
      readonly: true,
      section: 'Basic Information',
      compute: (data: any) => {
        if (!data.date) return '';
        const d = new Date(data.date);
        return d.toLocaleString('default', { month: 'short', year: 'numeric' });
      }
    },
    { key: 'department_id', label: 'Department', type: 'select', options: DEPARTMENTS, required: true, section: 'Basic Information' },
    { key: 'reported_by', label: 'Reported By', type: 'text', required: true, section: 'Basic Information' },
    { key: 'designation', label: 'Designation', type: 'text', required: true, section: 'Basic Information' },
    { key: 'affected_person', label: 'Affected Person Name', type: 'text', section: 'Basic Information' },
    { key: 'affected_designation', label: 'Affected Person Designation', type: 'text', section: 'Basic Information' },
    { key: 'time', label: 'Time (24 Hrs)', type: 'time', required: true, section: 'Basic Information' },
    { key: 'location', label: 'Area / Location', type: 'text', required: true, section: 'Basic Information' },
    { key: 'details', label: 'Details of the Near Miss', type: 'textarea', required: true, section: 'Near Miss Details' },
    { key: 'preventive_action', label: 'Preventive Action Suggestion', type: 'textarea', section: 'Corrective Actions' },
    { key: 'responsible_person', label: 'Resp.', type: 'text', section: 'Corrective Actions' },
    { key: 'investigation_required', label: 'Further Investigation Required (Y/N)', type: 'select', options: ['Yes', 'No'], section: 'Investigation' },
    { key: 'reported_in_hazard', label: 'Reported in HAZARD (Y/N)', type: 'select', options: ['Yes', 'No'], section: 'Investigation' },
    { key: 'status', label: 'Status (Open/Close)', type: 'select', options: ['Open', 'Closed'], section: 'Investigation' },
    { key: 'remarks', label: 'Remarks', type: 'textarea', section: 'Investigation' },
  ]
};

export const incidentLogSchema: SectionConfig = {
  id: 'incident-log',
  title: 'Incident Log',
  path: '/incident-log',
  accentColor: '#C46A2F',
  icon: 'FileWarning',
  columns: [
    { key: 's_no', label: 'S.No', type: 'text', hideFromForm: true, compute: d => d.s_no || '' },
    { key: 'date', label: 'Date', type: 'date', required: true, section: 'Basic Information' },
    { key: 'description', label: 'Description', type: 'textarea', required: true, section: 'Basic Information' },
    { key: 'shift', label: 'Shift', type: 'select', options: ['A', 'B', 'C', 'General'], required: true, section: 'Basic Information' },
    { key: 'area_manager', label: 'Area Manager', type: 'text', required: true, section: 'Basic Information' },
    { key: 'gender', label: 'Gender Wise', type: 'select', options: ['Male', 'Female', 'Other'], section: 'Basic Information' },
    { key: 'location', label: 'Location', type: 'text', required: true, section: 'Basic Information' },
    { key: 'department_id', label: 'Department', type: 'select', options: DEPARTMENTS, required: true, section: 'Basic Information' },
    { key: 'incident_category_id', label: 'Incident Category', type: 'select', options: INCIDENT_CATEGORIES, required: true, section: 'Incident Details' },
    { key: 'root_cause_id', label: 'Root Cause', type: 'select', options: ROOT_CAUSES, required: true, section: 'Incident Details' },
    { key: 'action_items', label: 'Action Items', type: 'textarea', section: 'Investigation' },
    { key: 'immediate_cause', label: 'Immediate Cause', type: 'textarea', section: 'Investigation' },
    { key: 'root_cause', label: 'Root Cause', type: 'textarea', section: 'Investigation' },
    { key: 'corrective_actions', label: 'Corrective Actions', type: 'textarea', section: 'Investigation' },
    { key: 'preventive_actions', label: 'Preventive Actions', type: 'textarea', section: 'Investigation' },
    { key: 'evidence_upload', label: 'Evidence Upload', type: 'file', section: 'Investigation' },
    { key: 'responsible_person', label: 'Responsible Person', type: 'text', section: 'Assignment' },
    { key: 'risk_rating_id', label: 'Risk Rating', type: 'select', options: RISK_RATINGS, required: true, section: 'Assignment' },
    { key: 'timeline', label: 'Timeline', type: 'date', section: 'Assignment' },
    { key: 'status_id', label: 'Status', type: 'select', options: STATUSES, required: true, section: 'Assignment' }
  ]
};

export const actionTrackerSchema: SectionConfig = {
  id: 'action-tracker',
  title: 'Actions / CAPA',
  path: '/action-tracker',
  accentColor: '#A73A28',
  icon: 'CheckSquare',
  columns: [
    { key: 'linked_id', label: 'Linked ID (Incident/Hazard)', type: 'text', required: true, section: 'Action Card' },
    { key: 'action', label: 'Action', type: 'textarea', required: true, section: 'Action Card' },
    { key: 'assigned_to', label: 'Responsible Person', type: 'text', required: true, section: 'Action Card' },
    { key: 'due_date', label: 'Due Date', type: 'date', required: true, section: 'Action Card' },
    { key: 'completion_date', label: 'Completion Date', type: 'date', section: 'Action Card' },
    { key: 'status_id', label: 'Status', type: 'select', options: STATUSES, required: true, section: 'Action Card' },
    { key: 'remarks', label: 'Remarks', type: 'textarea', section: 'Action Card' }
  ]
};

export const trainingRecordsSchema: SectionConfig = {
  id: 'training-records',
  title: 'Training Records',
  path: '/training-records',
  accentColor: '#8A7D5C',
  icon: 'Users',
  columns: [
    { key: 'date', label: 'Date', type: 'date', required: true, section: 'Training Details' },
    { key: 'training_type', label: 'Training Type', type: 'select', options: ['Internal', 'External', 'Toolbox Talk', 'Safety Briefing', 'Fire Drill', 'Orientation'], required: true, section: 'Training Details' },
    { key: 'department_id', label: 'Department', type: 'select', options: DEPARTMENTS, required: true, section: 'Training Details' },
    { key: 'trainer', label: 'Trainer', type: 'text', required: true, section: 'Training Details' },
    { key: 'venue', label: 'Venue', type: 'text', section: 'Training Details' },
    { key: 'topic', label: 'Topics Delivered', type: 'textarea', required: true, section: 'Training Details' },
    { key: 'participants', label: 'Total Participants', type: 'number', required: true, section: 'Training Details' },
    { key: 'duration_minutes', label: 'Duration (Min)', type: 'number', required: true, section: 'Training Details' },
    {
      key: 'manhours',
      label: 'Manhours',
      type: 'number',
      readonly: true,
      section: 'Summary',
      compute: (data: any) => {
        const p = parseFloat(data.participants) || 0;
        const d = parseFloat(data.duration_minutes) || 0;
        return (p * (d / 60)).toFixed(2);
      }
    },
    { key: 'status_id', label: 'Status', type: 'select', options: STATUSES, required: true, section: 'Training Details' },
    {
      key: 'total_manhours',
      label: 'Total Manhours',
      type: 'number',
      readonly: true,
      section: 'Summary',
      compute: (data: any, allEntries?: any[]) => {
        if (!allEntries) return 0;
        const deptEntries = allEntries.filter(e => e.department_id === data.department_id);
        const prevTotal = deptEntries.reduce((sum, e) => {
          if (e.id === data.id) return sum;
          return sum + (parseFloat(e.manhours) || 0);
        }, 0);
        const currentManhours = parseFloat(data.manhours) || 0;
        return (prevTotal + currentManhours).toFixed(2);
      }
    }
  ]
};

export const auditManagementSchema: SectionConfig = {
  id: 'audit-management',
  title: 'Audit Management',
  path: '/audit-management',
  accentColor: '#8B5CF6',
  icon: 'ClipboardList',
  columns: [
    { key: 'title', label: 'Audit Title', type: 'text', required: true, section: 'Audit' },
    { key: 'department_id', label: 'Department', type: 'select', options: DEPARTMENTS, section: 'Audit' },
    { key: 'auditor', label: 'Auditor', type: 'text', required: true, section: 'Audit' },
    { key: 'audit_date', label: 'Audit Date', type: 'date', required: true, section: 'Audit' },
    { key: 'findings', label: 'Findings / Notes', type: 'textarea', section: 'Audit' },
    { key: 'remarks', label: 'Remarks', type: 'textarea', section: 'Audit' }
  ]
};

export const inspectionRecordsSchema: SectionConfig = {
  id: 'inspection-records',
  title: 'Inspection Records',
  path: '/inspection-records',
  accentColor: '#F59E0B',
  icon: 'CheckSquare',
  columns: [
    { key: 'department_id', label: 'Department', type: 'select', options: DEPARTMENTS, section: 'Inspection' },
    { key: 'inspector', label: 'Inspector', type: 'text', required: true, section: 'Inspection' },
    { key: 'inspection_date', label: 'Inspection Date', type: 'date', required: true, section: 'Inspection' },
    { key: 'observations', label: 'Observations', type: 'textarea', section: 'Inspection' }
  ]
};

export const ALL_SECTIONS = [
  hazardReportingSchema,
  nearMissSchema,
  incidentLogSchema,
  trainingRecordsSchema,
  actionTrackerSchema,
  auditManagementSchema,
  inspectionRecordsSchema
];
