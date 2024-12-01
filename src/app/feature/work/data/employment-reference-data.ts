import { assetsPath } from "assets/assets-path-index";
import { EmploymentReference } from "../models/employment-reference";

export const employmentReferences: EmploymentReference[] = [
    {
        institution: "K&W Software AG",
        logoSrc: `${assetsPath.institutions}/k&w.png`,
        logoAlt: "K&W Software AG Logo",
        reference: "Thanks to his great motivation and curiosity, Mr Kunnumpurathu quickly familiarised himself with various areas of responsibility. He completed the work assigned to him quite independently and to our complete satisfaction. He worked systematically, carefully and produced good quality work.",
    },
    {
        institution: "Keller AG",
        logoSrc: `${assetsPath.institutions}/keller-ag.png`,
        logoAlt: "Keller AG Logo",
        reference: "We got to know Mr Kunnumpurathu as an enthusiastic, intelligent and interested employee. He is characterised by an independent, careful and precise way of working. He completed his tasks very cleanly, accurately and reliably.",
    },
].splice(0, 5);