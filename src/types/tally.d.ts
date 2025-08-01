// Type definitions for Tally forms
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: (options?: { 
        injectReactHelmet?: boolean;
        layout?: 'modal' | 'modal-zoomed' | 'drawer' | 'drawer-left' | 'drawer-right';
        width?: number | string;
        height?: number | string;
        autoClose?: number;
        hideTitle?: boolean;
        overlay?: boolean;
        emoji?: {
          text: string;
          animation: 'none' | 'wave' | 'tada' | 'heart-beat' | 'spin' | 'pulse' | 'rubber-band' | 'bounce' | 'jello' | 'wobble' | 'shake';
        };
        onOpen?: () => void;
        onClose?: () => void;
        onPageView?: (data: { event: string; formId: string; [key: string]: unknown }) => void;
        onSubmit?: (data: { responseId: string; fields: Record<string, unknown>; [key: string]: unknown }) => void;
      }) => void;
    };
  }
}

export {};
