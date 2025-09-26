"use client";

import { Trash2 } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useContractModal } from "@/shared/hooks/use-contract-modal";
import { useContractFiles } from "@/shared/stores/use-contract-file";

export function ContractModal() {
  const { form, onSubmit, isContractModalOpen, setContractModal } =
    useContractModal();

  const { files, setFile, removeFile } = useContractFiles();
  const Kb = 1024;
  const MaxSize = 10 * Kb * Kb;

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "administrasi" | "legal" | "teknis" | "keuangan"
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.type !== "application/pdf") {
      alert("Hanya file PDF yang diperbolehkan!");
      return;
    }
    if (file.size > MaxSize) {
      alert("Maksimal ukuran file 15MB");
      return;
    }
    setFile(type, { name: file.name, size: file.size });
  };

  return (
    <Dialog onOpenChange={setContractModal} open={isContractModalOpen}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Form Kontrak</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Tipe */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tipe kontrak" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="procurement_contracts">
                        Procurement Contract
                      </SelectItem>
                      <SelectItem value="service_contracts">
                        Service Contract
                      </SelectItem>
                      <SelectItem value="partnership_mou">MoU</SelectItem>
                      <SelectItem value="license_software_agreement">
                        License Software
                      </SelectItem>
                      <SelectItem value="employment_hr_contracts">
                        Employment
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nama Kontrak */}
            <FormField
              control={form.control}
              name="contractName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kontrak</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nama Perusahaan */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Perusahaan</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kontrak Masuk */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kontrak Masuk</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kontrak Berakhir */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kontrak Berakhir</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dokumen Administrasi */}
            <div className="col-span-2">
              <FormLabel>Dokumen Administrasi</FormLabel>
              {files.administrasi ? (
                <div className="mt-2 flex items-center justify-between rounded-md border p-3 text-sm">
                  <span>
                    📄 {files.administrasi.name} (
                    {(files.administrasi.size / Kb).toFixed(1)} KB)
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile("administrasi")}
                    type="button"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input disabled placeholder="Masukkan di sini" />
                  <label>
                    <input
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "administrasi")}
                      type="file"
                    />
                    <Button asChild type="button" variant="default">
                      <span>Tambahkan</span>
                    </Button>
                  </label>
                </div>
              )}
              <p className="mt-1 text-muted-foreground text-xs">
                File PDF, dengan file maks 40MB
              </p>
            </div>

            {/* Dokumen Legal */}
            <div className="col-span-2">
              <FormLabel>Dokumen Legal</FormLabel>
              {files.legal ? (
                <div className="mt-2 flex items-center justify-between rounded-md border p-3 text-sm">
                  <span>
                    📄 {files.legal.name} ({(files.legal.size / Kb).toFixed(1)}{" "}
                    KB)
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile("legal")}
                    type="button"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input disabled placeholder="Masukkan di sini" />
                  <label>
                    <input
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "legal")}
                      type="file"
                    />
                    <Button asChild type="button" variant="default">
                      <span>Tambahkan</span>
                    </Button>
                  </label>
                </div>
              )}
              <p className="mt-1 text-muted-foreground text-xs">
                File PDF, dengan file maks 40MB
              </p>
            </div>

            {/* Dokumen Teknis */}
            <div className="col-span-2">
              <FormLabel>Dokumen Teknis</FormLabel>
              {files.teknis ? (
                <div className="mt-2 flex items-center justify-between rounded-md border p-3 text-sm">
                  <span>
                    📄 {files.teknis.name} (
                    {(files.teknis.size / Kb).toFixed(1)} KB)
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile("teknis")}
                    type="button"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input disabled placeholder="Masukkan di sini" />
                  <label>
                    <input
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "teknis")}
                      type="file"
                    />
                    <Button asChild type="button" variant="default">
                      <span>Tambahkan</span>
                    </Button>
                  </label>
                </div>
              )}
              <p className="mt-1 text-muted-foreground text-xs">
                File PDF, dengan file maks 40MB
              </p>
            </div>

            {/* Dokumen Keuangan */}
            <div className="col-span-2">
              <FormLabel>Dokumen Keuangan</FormLabel>
              {files.keuangan ? (
                <div className="mt-2 flex items-center justify-between rounded-md border p-3 text-sm">
                  <span>
                    📄 {files.keuangan.name} (
                    {(files.keuangan.size / Kb).toFixed(1)} KB)
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile("keuangan")}
                    type="button"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input disabled placeholder="Masukkan di sini" />
                  <label>
                    <input
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "keuangan")}
                      type="file"
                    />
                    <Button asChild type="button" variant="default">
                      <span>Tambahkan</span>
                    </Button>
                  </label>
                </div>
              )}
              <p className="mt-1 text-muted-foreground text-xs">
                File PDF, dengan file maks 40MB
              </p>
            </div>

            {/* Actions */}
            <div className="col-span-2 mt-6 flex justify-end gap-4">
              <Button
                onClick={() => setContractModal(false)}
                type="button"
                variant="outline"
              >
                Batal
              </Button>
              <Button type="submit" variant="default">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
