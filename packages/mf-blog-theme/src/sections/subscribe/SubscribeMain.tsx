/* @jsx jsx  */

import React, { FC } from "react";
import DecoratedHeading from "../../components/DecoratedHeading";
import { jsx, Input, Button, Divider } from "theme-ui";
import useForm from "../../hooks/useForm";

export interface SubscribeMainProps {
  title: string;
  subtitle: string;
}

function submitHandler(e: React.FormEvent<HTMLFormElement>): void {
  console.log("Form Submitted");
  console.log(e);
}

const SubscribeMain: FC<SubscribeMainProps> = props => {
  const { values, handleChange, handleSubmission, errFields } = useForm(
    submitHandler
  );

  console.log(values);
  console.log(errFields);

  return (
    <div
      className="main-subscribe__container"
      sx={{
        minHeight: "500px",
        fontSize: 2,
        display: "flex",
        flexDirection: "column",
        maxWidth: "900px",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        alignSelf: "center"
      }}
    >
      <div
        className="main-subscribe__title"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%"
        }}
      >
        <DecoratedHeading heading={props.title} fontSizes={[3, 4]} responsive={true}/>
      </div>
      <div sx={{ color: "secondary", display: "grid", placeItems: "center", textAlign: "center" }}>{props.subtitle}</div>
      <div className="main_subscribe__form">
        <Divider
          sx={{
            width: "100%",
            height: "1px",
            bg: "accent",
            marginBlockStart: "15px",
            marginBlockEnd: "7.5px",
            marginInline: "7.5px"
          }}
        />
        <form
          sx={{
            display: "grid",
          }}
          id="main_subForm "
          onSubmit={handleSubmission}
        >
          <Input
            sx={{
              margin: "7.5px",
              flex: "0.7"
            }}
            type="email"
            name="email"
            value={values.email || ""}
            placeholder="a@bc.com"
            onChange={handleChange}
          />
          <Button
            variant="primary"
            sx={{ margin: "7.5px", flex: "0.3", padding:"0px" }}
            type="submit"
            name="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

SubscribeMain.defaultProps = {
  title: "Bring the International Cuisine Home",
  subtitle: "Get Recipes fresh from the kitchen of Married Friends"
};

export default SubscribeMain;
