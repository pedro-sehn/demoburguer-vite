export interface EstablishmentData {
  success: boolean;
  detail: string;
  data: {
    logo: string;
    name: string;
    about: string;
    background_color: string;
    primary_color: string;
    secondary_color: string;
    is_open: boolean;
    email: string;
    phone: string;
    background_image: string;
  };
}
