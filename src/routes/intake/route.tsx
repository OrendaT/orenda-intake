import { createFileRoute } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/ui/custom-button";
import { useState } from "react";
import { getItem, parseFormData, removeItem, removeLSItem } from "@/lib/utils";
import { FORM_ID, INTAKE_FORM } from "@/lib/constants";
import useAutoSave from "@/hooks/use-auto-save";
import useSubmitForm from "@/hooks/use-submit-form";
import { intakeInitialValues } from "@/lib/definitions";
import {
  PersonalInfo,
  AddressDetails,
  MentalHealth,
  InsuranceDetails,
  CreditCardDetails,
  PolicyDialog,
} from "@/components";
import SignaturePad from "@/components/ui/signature";
import ResponsiveTooltip from "@/components/responsive-tooltip";
import useAutoCreateForm from "@/hooks/use-auto-create-form";
import useSignature from "@/hooks/use-signature";
import SuccessModal from "@/components/intake-form/success-modal";
import type { IntakeFormData } from "@/types";

export const Route = createFileRoute("/intake")({
  component: IntakeForm,
});

export function IntakeForm() {
  const defaultValues = getItem(INTAKE_FORM) ?? intakeInitialValues;
  const methods = useForm<IntakeFormData>({
    defaultValues: defaultValues as IntakeFormData,
  });
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = methods;
  const {
    isPending: isLoading,
    isSuccess,
    mutateAsync: submitForm,
  } = useSubmitForm();
  const { setSignature } = useSignature();

  // Watch the policy agreement checkbox
  const acceptedTerms =
    watch("policy_agreement")?.[0] === "I agree" ||
    watch("policy_agreement") === "I agree";

  const [openTerms, setOpenTerms] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (data.relationship_status_other) {
      data.relationship_status = data.relationship_status_other;
      data.relationship_status_other = undefined;
    }

    data = parseFormData(data);

    console.log(data);

    const response = await submitForm(data);

    console.log(response);

    if (response?.data.success) {
      removeItem(INTAKE_FORM);
      reset(intakeInitialValues);
      removeLSItem(FORM_ID);
      setSignature({ text: "", base64: "" });
    }
  });

  const formState = watch();
  const sanitizedState = {
    ...formState,
    policy_agreement: undefined,
  };

  useAutoSave({ value: sanitizedState });

  const { first_name, last_name, email, phone } = formState;
  useAutoCreateForm({ first_name, last_name, email, phone });

  return (
    <>
      <main className="main">
        <div className="main-container">
          <h1 className="page-heading">Orenda Intake Form</h1>

          <p className="max-w-3xl mx-auto font-semibold text-center">
            Please complete this form so your appointment may be scheduled
            <br />
            <em>
              (Your appointment will be confirmed following the completion of
              this form)
            </em>
          </p>

          <br />

          <p className="max-w-3xl mx-auto text-center">
            <em>
              If you or someone you know is actively considering suicide or
              self-harm, please immediately call <a href="tel:911">911</a> or
              the Suicide Prevention Hotline at{" "}
              <a href="tel:+18002738255">1-800-273-8255</a>. Immediate help is
              available.
            </em>
          </p>

          <FormProvider {...methods}>
            <form
              className="mt-10 clamp-[text,sm,base]"
              onSubmit={onSubmit}
              noValidate
            >
              {/* Form content */}
              <div className="form-content">
                <PersonalInfo />

                <AddressDetails />

                <MentalHealth />

                <InsuranceDetails />

                <CreditCardDetails />
              </div>

              {/* Terms and Conditions Agreement */}
              <fieldset className="mx-auto max-w-[52.125rem] rounded bg-transparent pb-0 clamp-[px,0,12]">
                <div className="border-l-[5px] border-zinc-500 clamp-[pl,4,10] ">
                  <label className="flex w-full items-center gap-3 clamp-[text,sm,0.93rem]">
                    <input
                      className="flex-shrink-0 size-4"
                      type="checkbox"
                      value="I agree"
                      {...register("policy_agreement", {
                        required: "This field is required",
                      })}
                    />

                    <div>
                      <span>
                        By clicking on the checkbox and signing below, I confirm
                        that I have read and agreed to Orenda&apos;s{" "}
                        <PolicyDialog
                          open={openTerms}
                          onOpenChange={setOpenTerms}
                        >
                          <button
                            type="button"
                            className="font-medium text-orenda-purple"
                          >
                            <span className="underline underline-offset-2">
                              Terms of Use and Practice Policy
                            </span>
                          </button>
                        </PolicyDialog>
                      </span>

                      <span className="inline-flex">
                        <ResponsiveTooltip
                          content={
                            <ul>
                              <li>Consent for Telehealth Consultation</li>
                              <li>Notice of Privacy Policies</li>
                              <li>Practice Policies</li>
                              <li>
                                Informed Consent for Psychiatric Treatment{" "}
                              </li>
                              <li>Consent for Medication History</li>
                            </ul>
                          }
                        />
                      </span>
                    </div>
                  </label>

                  <SignaturePad
                    name="policy_agreement_signature"
                    className="mt-5"
                  />
                </div>
              </fieldset>

              {/* Form submit button */}
              <Button
                disabled={!acceptedTerms}
                isLoading={isLoading}
                type="submit"
                className="mx-auto mt-12"
              >
                {isLoading ? "Submitting" : "Submit Form"}
              </Button>

              {!!Object.entries(errors)?.length && (
                <p className="error !mt-4 text-center !text-sm font-semibold">
                  Please ensure all required fields are filled out.
                </p>
              )}
            </form>
          </FormProvider>
        </div>
      </main>

      {isSuccess && <SuccessModal open={isSuccess} />}
    </>
  );
}
