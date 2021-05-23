/* @jsx jsx  */

import React, { FC, useState } from "react";
import DecoratedHeading from "../../components/DecoratedHeading";
import { jsx, Input, Button, Divider, SxStyleProp, Spinner } from "theme-ui";
import useForm from "../../hooks/useForm";
import { FLEX_CONFIG } from "../../utils/style";
import fetch from "isomorphic-fetch";

export interface SubscribeMainProps {
  title: string;
  subtitle: string;
}
const SubscribeMain: FC<SubscribeMainProps> = (props) => {
  const { values, handleChange, handleSubmission, errFields } = useForm(
    submitHandler
  );

  const [submitRequestState, setSubmitReqState] = useState<
    "IDLE" | "SUBMITTING" | "ERROR" | "SUCCESS" | "EXIST"
  >("IDLE");

  async function submitHandler(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    if (typeof window === "undefined") return;

    setSubmitReqState("SUBMITTING");

    if ("email" in values) {
      const { email } = values;
      const response = await fetch(`/.netlify/functions/subscribe`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          tags: [
            process.env.NODE_ENV,
            typeof window === "undefined"
              ? "backend"
              : window.location.pathname,
          ],
        }),
      });

      const resJSON = await response.json();
      if (response.status === 200) {
        setSubmitReqState("SUCCESS");
        return;
      } else {
        if (resJSON.title === "Member Exists") {
          setSubmitReqState("EXIST");
          return;
        }
        console.error("Some error while subscribing");
        console.error(resJSON);
        setSubmitReqState("ERROR");
      }
    }
  }

  const getButtonLabel = () => {
    switch (submitRequestState) {
      case "IDLE":
        return "Submit";
      case "SUBMITTING":
        return <Spinner />;
      case "EXIST":
        return "We're already connected.";
      case "SUCCESS":
        return "Yayy! we're friends";
      default:
        return "Submit";
    }
  };

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
        alignSelf: "center",
      }}
    >
      <div
        className="main-subscribe__title"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
        }}
      >
        <DecoratedHeading
          heading={props.title}
          fontSizes={[3, 4]}
          responsive={true}
        />
      </div>
      <div
        sx={{
          color: "secondary",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        {props.subtitle}
      </div>
      <div
        sx={
          {
            ...FLEX_CONFIG("flex", "column"),
            width: "100%",
          } as SxStyleProp
        }
        className="main_subscribe__form"
      >
        <Divider
          sx={{
            width: "100%",
            height: "1px",
            bg: "accent",
            marginBlockStart: "15px",
            marginBlockEnd: "7.5px",
          }}
        />
        <form
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
          }}
          id="main_subForm "
          onSubmit={handleSubmission}
        >
          <Input
            sx={{
              margin: `7.5px`,
              flex: `${
                ["SUCCESS", "EXIST"].includes(submitRequestState)
                  ? "0 0 0px"
                  : "5 1 200px"
              }`,
              paddingX: `${
                ["SUCCESS", "EXIST"].includes(submitRequestState) ? "0px" : "1"
              }`,
              marginX: `${
                ["SUCCESS", "EXIST"].includes(submitRequestState) ? "0px" : "0"
              }`,
              transition: "all 0.5s ease-in-out",
            }}
            type="email"
            name="email"
            value={values.email || ""}
            placeholder="youremail@domain.com"
            onChange={handleChange}
            required
            disabled={submitRequestState === "SUCCESS" ? true : false}
          />
          <Button
            variant="primary"
            sx={{ margin: "7.5px", flex: "1 1 200px", padding: "0px" }}
            type="submit"
            name="submit"
          >
            {getButtonLabel()}
          </Button>
        </form>
      </div>
    </div>
  );
};

SubscribeMain.defaultProps = {
  title: "Bring the International Cuisine Home",
  subtitle: "Get Recipes fresh from the kitchen of Married Friends",
};

export default SubscribeMain;
