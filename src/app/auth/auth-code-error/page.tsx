import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-center font-medium space-y-2">
        <p className="text-destructive text-lg font-medium">
          There was an error with your authentication code.
        </p>
        <p className="">Please try again later.</p>
      </h1>
      <Link href="/" className="underline font-semibold">
        Visit Home
      </Link>
    </div>
  );
}
