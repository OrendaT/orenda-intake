import { createFileRoute } from "@tanstack/react-router";
import { IntakeForm } from "./intake/route";

export const Route = createFileRoute("/")({
  component: IntakeForm,
});
