import { INSTITUTIONS } from "assets/assets.constants";
import { EmploymentReference } from "../models/employment-reference";

export const employmentReferences: EmploymentReference[] = [
    {
        institution: "K&W Software AG",
        logo: {
            srcImage: INSTITUTIONS.kwsoft,
            alt: "K&W Software AG Logo",
        },
        reference: "Thanks to his great motivation and curiosity, Mr Kunnumpurathu quickly familiarised himself with various areas of responsibility. He completed the work assigned to him quite independently and to our complete satisfaction. He worked systematically, carefully and produced good quality work.",
    },
    {
        institution: "Keller AG",
        logo: {
            srcImage: INSTITUTIONS.kellerAg,
            alt: "Keller AG Logo",
        },
        reference: "We got to know Mr Kunnumpurathu as an enthusiastic, intelligent and interested employee. He is characterised by an independent, careful and precise way of working. He completed his tasks very cleanly, accurately and reliably.",
    },
].splice(0, 5);