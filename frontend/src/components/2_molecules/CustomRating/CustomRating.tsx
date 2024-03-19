import styled from "@emotion/styled";
import { CustomRatingProps } from "./CustomRatingInterfaces";

import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import * as React from "react";
import theme from "../../../layouts/theme";

const StyledRating = styled(Rating)(() => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  2: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  3: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export const CustomRating = ({
  readOnly,
  defaultValue,
  value,
  onChange,
}: CustomRatingProps): JSX.Element => {
  return (
    <StyledRating
      precision={1}
      max={3}
      IconContainerComponent={IconContainer}
      highlightSelectedOnly
      readOnly={readOnly}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  );
};
