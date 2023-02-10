import React, {useCallback, useState} from 'react';
import { faqText } from "./mock";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Faq = () => {
  const [expanded, setExpanded] = useState<string | boolean>(false);

  const handleChange = useCallback((id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  }, [expanded]);

  return (
    <div className="w-full px-4 mt-4">
      <div className="flex items-center">
        <Typography variant="h6">
          Вопросы и ответы
        </Typography>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {faqText.map((faq, index) => (
          <Accordion expanded={expanded === faq.id} onChange={handleChange(faq.id)} key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={faq.id}
              className="px-2"
            >
              {faq.title}
            </AccordionSummary>
            <AccordionDetails>
              {faq.text}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
