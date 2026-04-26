"use client";

import CreateLocationForm from "@/app/components/CreateLocationForm";
import { useAuth } from "../../api/auth/AuthContext";
import { redirect } from "next/navigation";
import React from "react";

export default function CreateLocations() {
  const { user, isAdmin } = useAuth();

  if (!isAdmin) {
    redirect("/");
  }
  return (
    <>
      <CreateLocationForm />
    </>
  );
}
