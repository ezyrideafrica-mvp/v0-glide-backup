"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function ProviderDocuments() {
  const [file, setFile] = useState<File | null>(null);

  async function upload() {
    if (!file) return;

    const { data: { user } } = await supabase.auth.getUser();

    const filePath = `providers/${user!.id}/${file.name}`;

    const { error } = await supabase.storage
      .from("provider_documents")
      .upload(filePath, file);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Uploaded!");
  }

  return (
    <div className="max-w-lg mx-auto py-10">
      <h2 className="text-xl font-semibold mb-4">Upload Verification Documents</h2>

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

      <Button className="mt-4" onClick={upload}>
        Upload
      </Button>
    </div>
  );
}
