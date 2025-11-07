import { Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export {
  generateMcxScreens,
  renderMontanteText,
  renderReferenciaText,
} from "./mcxinputs-helpers";

export { createGridButtons } from "./create-grid-buttons";
export { splitArray, sortDataArray } from "./arrays";
export { renderServicoNomeParam } from "./render-servico-nome";

export { errorNotification, sucessNotification } from "./notifications";

export {
  produtoCarregamentoSchema,
  produtoPagamentoSchema,
  produtoRecargasSchema,
} from "./schemas";

export { openMcxDataModal, openMcxPreviewModal } from "./open-mcx-modal";
