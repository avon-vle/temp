export const brand = {
  blue: "#003791",
  green: "#00A651",
  ink: "#111111",
  line: "#E8E8E3",
  mist: "#F4F4F1",
  mute: "#5E5E59",
  paper: "#FFFFFF",
  red: "#E60012",
  yellow: "#FFC20E",
} as const;

export const stripes = [
  { hex: brand.red, name: "Red" },
  { hex: brand.yellow, name: "Yellow" },
  { hex: brand.green, name: "Green" },
  { hex: brand.blue, name: "Blue" },
] as const;

export const stripeColors = stripes.map((stripe) => stripe.hex);

export const productColors = [
  { hex: brand.blue, name: "Provision", role: "Structure" },
  { hex: brand.yellow, name: "Test", role: "Signal" },
  { hex: brand.green, name: "Suggest", role: "Forward" },
  { hex: brand.red, name: "Assess", role: "Mark" },
] as const;

export type BrandTheme = "light" | "dark";
