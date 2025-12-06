
import { FontOption, SignatureColor, BlogPost, TranslationKey } from './types';

export const FONTS: FontOption[] = [
  // Messy / Natural Handwriting (New & Enhanced)
  { name: 'Waiting for the Sunrise', family: "'Waiting for the Sunrise', cursive", category: 'handwriting' },
  { name: 'Nothing You Could Do', family: "'Nothing You Could Do', cursive", category: 'handwriting' },
  { name: 'Zeyada', family: "'Zeyada', cursive", category: 'handwriting' },
  { name: 'Homemade Apple', family: "'Homemade Apple', cursive", category: 'handwriting' },
  { name: 'Reenie Beanie', family: "'Reenie Beanie', cursive", category: 'handwriting' },
  { name: 'Covered By Your Grace', family: "'Covered By Your Grace', cursive", category: 'handwriting' },
  { name: 'Just Me Again Down Here', family: "'Just Me Again Down Here', cursive", category: 'handwriting' },
  { name: 'La Belle Aurore', family: "'La Belle Aurore', cursive", category: 'handwriting' },
  { name: 'Gloria Hallelujah', family: "'Gloria Hallelujah', cursive", category: 'casual' },
  
  // Existing Elegant
  { name: 'Great Vibes', family: "'Great Vibes', cursive", category: 'elegant' },
  { name: 'Mrs Saint Delafield', family: "'Mrs Saint Delafield', cursive", category: 'elegant' },
  { name: 'Pinyon Script', family: "'Pinyon Script', cursive", category: 'elegant' },
  { name: 'Alex Brush', family: "'Alex Brush', cursive", category: 'elegant' },
  { name: 'Allura', family: "'Allura', cursive", category: 'elegant' },
  { name: 'Caveat', family: "'Caveat', cursive", category: 'casual' },
  { name: 'Dancing Script', family: "'Dancing Script', cursive", category: 'elegant' },
  { name: 'Herr Von Muellerhoff', family: "'Herr Von Muellerhoff', cursive", category: 'elegant' },
  { name: 'Meddon', family: "'Meddon', cursive", category: 'handwriting' },
  { name: 'Monsieur La Doulaise', family: "'Monsieur La Doulaise', cursive", category: 'elegant' },
  { name: 'Pacifico', family: "'Pacifico', cursive", category: 'casual' },
  { name: 'Parisienne', family: "'Parisienne', cursive", category: 'elegant' },
  { name: 'Sacramento', family: "'Sacramento', cursive", category: 'elegant' },
  { name: 'WindSong', family: "'WindSong', cursive", category: 'handwriting' }
];

export const COLORS: SignatureColor[] = [
  '#0f172a', // Midnight (Default)
  '#000000', // Black
  '#1d4ed8', // Blue
  '#b91c1c', // Red
  '#047857', // Green
  '#7c2d12', // Brown
];

export const PRESET_TEXTS: string[] = [
  'John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Williams', 'Michael Brown'
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Psychology of Signatures',
    slug: 'psychology-of-signatures',
    summary: 'What does your signature say about your personality? Experts weigh in on the hidden meanings behind size, slant, and legibility.',
    content: '<p>Graphology, the study of handwriting, suggests that your signature is a public mask...</p>',
    date: 'December 1, 2025',
    author: 'Sarah Jenkins',
    readTime: '5 min read',
    tags: ['Psychology', 'Design'],
    image: 'https://ui-avatars.com/api/?name=Psychology&background=e2e8f0&color=0f172a&size=800'
  },
  {
      id: '2',
      title: 'Digital vs. Electronic Signatures',
      slug: 'digital-vs-electronic-signatures',
      summary: 'Understanding the legal and technical differences between e-signatures and cryptographic digital signatures.',
      content: '<p>While often used interchangeably, these terms refer to vastly different technologies...</p>',
      date: 'November 20, 2025',
      author: 'David Ross',
      readTime: '7 min read',
      tags: ['Legal', 'Tech'],
      image: 'https://ui-avatars.com/api/?name=Tech&background=e2e8f0&color=0f172a&size=800'
  }
];

export const TRANSLATIONS: Record<TranslationKey, string> = {
  app_title: 'SignCraft - Free Handwritten Signature Generator',
  app_description: 'Create professional, realistic handwritten signatures online. Type to generate or draw your own. Features vector SVG export, pressure sensitivity, and privacy-focused client-side processing.',
  hero_title: 'Professional Handwritten Signatures.',
  hero_subtitle: 'The privacy-first signature generator. Create realistic digital signatures for documents, email signatures, and creative projects. No sign-up required.',
  tab_type: 'Type Signature',
  tab_draw: 'Draw Signature',
  label_color: 'Ink Color',
  label_customize: 'Customize Style',
  label_slant: 'Slant',
  label_spacing: 'Spacing',
  label_sig_line: 'Signature Line',
  label_pen_style: 'Pen Style',
  label_pen_size: 'Stroke Width',
  label_bg: 'Background',
  placeholder_text: 'Type your name',
  placeholder_subtitle: 'Add a subtitle (e.g. CEO)',
  btn_copy: 'Copy Image',
  btn_download_png: 'Download PNG',
  btn_download_svg: 'Download SVG',
  btn_save: 'Save',
  btn_white_bg: 'With White BG',
  btn_white_ink: 'White Ink',
  btn_clear: 'Clear',
  btn_undo: 'Undo',
  btn_redo: 'Redo',
  nav_home: 'Generator',
  nav_blog: 'Blog',
  nav_about: 'About',
  nav_contact: 'Contact',
  nav_privacy: 'Privacy',
  nav_terms: 'Terms',
  footer_rights: 'All rights reserved.',
  feature_privacy: '100% Private',
  feature_vector: 'Vector Quality',
  feature_ink: 'Natural Ink',
  rating_label: 'Rated #1 for Privacy',
  seo_why_title: 'Why Choose SignCraft?',
  seo_why_desc: 'In an age of digital documents, a professional signature is your identity. SignCraft offers the only truly client-side, privacy-focused solution that generates pressure-sensitive, vector-quality signatures without ever sending your data to a server.',
  feature_privacy_desc: 'Your data never leaves your browser. All generation happens locally.',
  feature_vector_desc: 'Download crisp SVGs that stay sharp at any size for professional printing.',
  feature_ink_desc: 'Our engine simulates real variable-width ink flow for authenticity.',
  how_to_title: 'How It Works',
  step_1_title: 'Choose Mode',
  step_1_desc: 'Type for instant elegance or Draw for personal flair.',
  step_2_title: 'Customize',
  step_2_desc: 'Adjust slant, weight, and color to match your brand.',
  step_3_title: 'Download',
  step_3_desc: 'Get a transparent PNG or SVG ready for use.',
  supported_styles_title: 'Supported Styles',
  footer_tagline: 'The professional choice for digital signatures.',
  footer_product: 'Product',
  footer_company: 'Company',
  footer_legal: 'Legal',
  footer_privacy_arch: 'Privacy-First Architecture',
  footer_no_ai: 'No AI Training',
  toast_sig_downloaded: 'Signature downloaded!',
  toast_svg_downloaded: 'Vector SVG downloaded!',
  toast_copied: 'Copied to clipboard!',
  toast_copy_failed: 'Failed to copy',
  control_on: 'On',
  control_off: 'Off',
  control_solid: 'Solid',
  control_dashed: 'Dashed',
  control_x_mark: 'X-Mark',
  draw_sign_space: 'Sign here'
};
