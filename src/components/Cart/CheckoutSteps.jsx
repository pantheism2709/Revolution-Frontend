import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Typography from "@mui/material/Typography";



const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <LocalShippingIcon />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: "Payment",
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <div className=" pt-3">
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step key={index} active={activeStep === index} completed={activeStep >= index}>
            <StepLabel
              icon={item.icon}
              className={`${
                activeStep >= index ? "text-purple-500" : "text-gray-400"
              }`}
            >
              <Typography className={`${activeStep >= index ? "text-purple-500" : "text-gray-400"}`}>
                {item.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
