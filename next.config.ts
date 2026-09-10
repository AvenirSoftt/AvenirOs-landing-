import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Значок Next в углу закрывает левый нижний угол макета и попадает на каждый
  // проверочный снимок (scripts/qa.mjs). Ошибки сборки и рантайма он всё равно
  // показывает — отключается только сам индикатор.
  devIndicators: false,
};

export default nextConfig;
