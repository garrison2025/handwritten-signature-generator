
export type SignatureColor = string;

export interface FontOption {
  name: string;
  family: string;
  category: 'elegant' | 'casual' | 'handwriting';
}

export type TabMode = 'type' | 'draw';

// Navigation State
export type AppView = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'blog' | 'blog-post';

export interface SignatureSettings {
  text: string;
  color: SignatureColor;
  fontSize: number; 
  strokeWidth: number; 
}

export interface TypeStyle {
  slant: number; // -10 to 20 degrees
  spacing: number; // -5 to 15 pixels
  subtitle?: string; // New subtitle field
}

export interface SignatureLineOptions {
    enabled: boolean;
    style: 'solid' | 'dashed';
    showX: boolean;
}

export interface ExportOptions {
  background: 'transparent' | 'white';
  invert: boolean;
}

export type PenStyle = 'fountain' | 'monoline';

export interface ToastMessage {
    id: string;
    message: string;
    type: 'success' | 'info';
}

export interface Point {
    x: number;
    y: number;
    pressure: number; // 0 to 1
    time: number;
}

export type BackgroundPattern = 'blank' | 'grid' | 'lines';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // HTML string
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  image?: string;
}

export type TranslationKey = 
  | 'app_title'
  | 'app_description'
  | 'hero_title'
  | 'hero_subtitle'
  | 'tab_type'
  | 'tab_draw'
  | 'label_color'
  | 'label_customize'
  | 'label_slant'
  | 'label_spacing'
  | 'label_sig_line'
  | 'label_pen_style'
  | 'label_pen_size'
  | 'label_bg'
  | 'placeholder_text'
  | 'placeholder_subtitle'
  | 'btn_copy'
  | 'btn_download_png'
  | 'btn_download_svg'
  | 'btn_save'
  | 'btn_white_bg'
  | 'btn_white_ink'
  | 'btn_clear'
  | 'btn_undo'
  | 'btn_redo'
  | 'nav_home'
  | 'nav_blog'
  | 'nav_about'
  | 'nav_contact'
  | 'nav_privacy'
  | 'nav_terms'
  | 'footer_rights'
  | 'feature_privacy'
  | 'feature_vector'
  | 'feature_ink'
  // Expanded Keys
  | 'rating_label'
  | 'seo_why_title'
  | 'seo_why_desc'
  | 'feature_privacy_desc'
  | 'feature_vector_desc'
  | 'feature_ink_desc'
  | 'how_to_title'
  | 'step_1_title'
  | 'step_1_desc'
  | 'step_2_title'
  | 'step_2_desc'
  | 'step_3_title'
  | 'step_3_desc'
  | 'supported_styles_title'
  | 'footer_tagline'
  | 'footer_product'
  | 'footer_company'
  | 'footer_legal'
  | 'footer_privacy_arch'
  | 'footer_no_ai'
  | 'toast_sig_downloaded'
  | 'toast_svg_downloaded'
  | 'toast_copied'
  | 'toast_copy_failed'
  | 'control_on'
  | 'control_off'
  | 'control_solid'
  | 'control_dashed'
  | 'control_x_mark'
  | 'draw_sign_space';
