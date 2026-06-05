import MinimalTemplate from "./MinimalTemplate";
import DarkTemplate from "./DarkTemplate";
import WitchyTemplate from "./WitchyTemplate";
import BoldTemplate from "./BoldTemplate";
import NatureTemplate from "./NatureTemplate";

export const TEMPLATES = {
  minimal: { component: MinimalTemplate, label: "Minimal",  desc: "Limpo e moderno",      preview: "⬜" },
  dark:    { component: DarkTemplate,    label: "Dark",     desc: "Premium e elegante",    preview: "⬛" },
  witchy:  { component: WitchyTemplate,  label: "Witchy",   desc: "Místico e único",       preview: "🔮" },
  bold:    { component: BoldTemplate,    label: "Bold",     desc: "Impactante e moderno",  preview: "🔴" },
  nature:  { component: NatureTemplate,  label: "Nature",   desc: "Natural e acolhedor",   preview: "🌿" },
};

export function getTemplate(theme) {
  return TEMPLATES[theme]?.component || MinimalTemplate;
}
