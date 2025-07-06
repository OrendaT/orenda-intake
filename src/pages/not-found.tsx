import Button from "@/components/ui/custom-button";
import { useNavigate } from "@tanstack/react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate({ to: "." });
    } else {
      navigate({ to: "/" });
    }
  };

  console.log("NotFound component rendered");

  return (
    <div className="flex flex-col items-center justify-center px-5 text-center h-dvh">
      <h1 className="mb-6 clamp-[text,3xl,4xl] font-bold text-gray-800 font-heading">
        Page Not Found
      </h1>
      <p className="mb-8 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Button className="px-12 w-fit" onClick={goBack}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
