export interface CustomRatingProps {
  readOnly?: boolean;
  defaultValue?: number;
  value?: number | null | undefined;
  onChange?: (e: any) => void;
}
