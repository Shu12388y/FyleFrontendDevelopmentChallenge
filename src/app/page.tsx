import Link from "next/link";
import { Button } from "../components/ui/button";
import React from "react";
export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-sans text-3xl mb-4 font-bold">
          {" "}
          Health Challenge Tracker
        </h1>
        <Link prefetch href="/workout">
          <Button>Create</Button>
        </Link>
      </div>
    </>
  );
}
