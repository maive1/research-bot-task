import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";

interface ResearchArticleInformationCardProps {
  title: string;
  year: number;
  authors: Array<string>;
  citationCount: number;
}

const ResearchArticleInformationCard: FC<
  ResearchArticleInformationCardProps
> = ({ title, year, authors, citationCount }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="primary" variant="h5">
          Article
        </Typography>
        <Typography variant="body1">
          Title: <strong>{title}</strong>
        </Typography>
        <Typography variant="body1">
          Year: <strong>{year}</strong>
        </Typography>
        <Typography variant="body1">
          Authors: <strong>{authors.join(", ")}</strong>
        </Typography>
        <Typography variant="body1">
          Citations: <strong>{citationCount}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResearchArticleInformationCard;
