/** biome-ignore-all lint/suspicious/noAlert: <explanation> */
/** biome-ignore-all lint/nursery/noShadow: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: <explanation> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
import { File, RotateCw, Trash2, UploadCloudIcon, X } from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";

export type FileStatus = "uploading" | "failed" | "success";

export type FileItem = {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: FileStatus;
  file: File;
};

type FileUploadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (files: FileItem[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedFileTypes?: string[];
  title?: string;
  description?: string;
  saveButtonText?: string;
  cancelButtonText?: string;
};

export default function FileUploadModal({
  open,
  onOpenChange,
  onSave,
  maxFiles = 5,
  maxSize = 10,
  acceptedFileTypes = [".jpg", ".png"],
  title = "Unggah Dokumen",
  description = "Tambahkan dokumen disini dan hanya bisa mengunggah maksimal 5 file",
  saveButtonText = "Simpan",
  cancelButtonText,
}: FileUploadModalProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = (file: File): FileItem => {
    // Generate a unique ID for the file
    const id = Math.random().toString(36).substring(2, 9);

    // Simulate file upload with progress
    const newFile: FileItem = {
      id,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
      file,
    };

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles((prevFiles) => {
        const fileIndex = prevFiles.findIndex((f) => f.id === id);
        if (fileIndex === -1) {
          clearInterval(interval);
          return prevFiles;
        }

        const updatedFiles = [...prevFiles];
        const currentFile = updatedFiles[fileIndex];

        if (currentFile.progress >= 100) {
          clearInterval(interval);
          updatedFiles[fileIndex] = {
            ...currentFile,
            progress: 100,
            status: "success",
          };
        } else {
          updatedFiles[fileIndex] = {
            ...currentFile,
            progress: currentFile.progress + 5,
          };
        }

        return updatedFiles;
      });
    }, 200);

    return newFile;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files);

        // Check if adding these files would exceed the maximum
        if (files.length + newFiles.length > maxFiles) {
          alert(`You can only upload a maximum of ${maxFiles} files.`);
          return;
        }

        // Process each file
        const processedFiles = newFiles
          .map((file) => {
            // Check file size
            if (file.size > maxSize * 1024 * 1024) {
              alert(
                `File ${file.name} exceeds the maximum size of ${maxSize}MB.`
              );
              return null;
            }

            // Check file type
            const fileExtension = `.${file.name
              .split(".")
              .pop()
              ?.toLowerCase()}`;
            if (!acceptedFileTypes.includes(fileExtension)) {
              alert(`File type ${fileExtension} is not supported.`);
              return null;
            }

            return processFile(file);
          })
          .filter(Boolean) as FileItem[];

        setFiles((prev) => [...prev, ...processedFiles]);
      }
    },
    [files, maxFiles, maxSize, acceptedFileTypes, processFile]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const newFiles = Array.from(e.target.files);

        // Check if adding these files would exceed the maximum
        if (files.length + newFiles.length > maxFiles) {
          alert(`You can only upload a maximum of ${maxFiles} files.`);
          return;
        }

        // Process each file
        const processedFiles = newFiles
          .map((file) => {
            // Check file size
            if (file.size > maxSize * 1024 * 1024) {
              alert(
                `File ${file.name} exceeds the maximum size of ${maxSize}MB.`
              );
              return null;
            }

            // Check file type
            const fileExtension = `.${file.name
              .split(".")
              .pop()
              ?.toLowerCase()}`;
            if (!acceptedFileTypes.includes(fileExtension)) {
              alert(`File type ${fileExtension} is not supported.`);
              return null;
            }

            return processFile(file);
          })
          .filter(Boolean) as FileItem[];

        setFiles((prev) => [...prev, ...processedFiles]);
      }

      // Reset the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [files, maxFiles, maxSize, acceptedFileTypes, processFile]
  );

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const handleRetryUpload = useCallback((id: string) => {
    setFiles((prev) => {
      const fileIndex = prev.findIndex((file) => file.id === id);
      if (fileIndex === -1) {
        return prev;
      }

      const updatedFiles = [...prev];
      updatedFiles[fileIndex] = {
        ...updatedFiles[fileIndex],
        progress: 0,
        status: "uploading",
      };

      // Simulate upload progress again
      const interval = setInterval(() => {
        setFiles((prevFiles) => {
          const currentFileIndex = prevFiles.findIndex((f) => f.id === id);
          if (currentFileIndex === -1) {
            clearInterval(interval);
            return prevFiles;
          }

          const updatedFiles = [...prevFiles];
          const currentFile = updatedFiles[currentFileIndex];

          if (currentFile.progress >= 100) {
            clearInterval(interval);
            updatedFiles[currentFileIndex] = {
              ...currentFile,
              progress: 100,
              status: "success", // Always succeed on retry for better UX
            };
          } else {
            updatedFiles[currentFileIndex] = {
              ...currentFile,
              progress: currentFile.progress + 5,
            };
          }

          return updatedFiles;
        });
      }, 200);

      return updatedFiles;
    });
  }, []);

  const handleSave = useCallback(() => {
    onSave(files);
    onOpenChange(false);
  }, [files, onSave, onOpenChange]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return `${bytes}b`;
    }
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)}kb`;
    }
    return `${Math.round(bytes / (1024 * 1024))}mb`;
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p className="text-muted-foreground text-sm">{description}</p>
        </DialogHeader>

        <div
          className={cn(
            "mt-4 rounded-md border-2 border-dashed p-8 text-center",
            isDragging ? "border-primary bg-primary/5" : "border-primary/60"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            accept={acceptedFileTypes.join(",")}
            className="hidden"
            multiple
            onChange={handleFileInputChange}
            ref={fileInputRef}
            type="file"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <UploadCloudIcon className="h-10 w-10 text-blue-600" />
            <p className="font-medium text-sm">
              Tarik file anda atau{" "}
              <button
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={handleBrowseClick}
                type="button"
              >
                cari
              </button>
            </p>
            <p className="text-muted-foreground text-xs">
              Ukuran file maksimal {maxSize} MB.
            </p>
          </div>
        </div>

        <p className="text-muted-foreground text-xs">
          Hanya mendukung file {acceptedFileTypes.join(", ")}
        </p>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file) => (
              <div className="rounded-md border p-3" key={file.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {formatFileSize(file.size)}
                      </p>
                      {file.status === "failed" && (
                        <p className="text-red-500 text-xs">Gagal mengunggah</p>
                      )}
                      {file.status === "success" && (
                        <p className="text-green-500 text-xs">
                          Berhasil mengunggah
                        </p>
                      )}
                    </div>
                  </div>

                  {file.status === "uploading" && (
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveFile(file.id)}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Hapus</span>
                    </button>
                  )}

                  {file.status === "failed" && (
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => handleRetryUpload(file.id)}
                      type="button"
                    >
                      <RotateCw className="h-4 w-4" />
                      <span className="sr-only">Coba lagi</span>
                    </button>
                  )}

                  {file.status === "success" && (
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveFile(file.id)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Hapus</span>
                    </button>
                  )}
                </div>

                {file.status === "uploading" && (
                  <div className="mt-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-green-500 transition-all duration-300 ease-in-out"
                        style={{
                          width: `${file.progress}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-right text-xs">{file.progress}%</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <DialogFooter className="flex justify-end gap-2">
          {cancelButtonText && (
            <Button
              onClick={() => onOpenChange(false)}
              type="button"
              variant="secondary"
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            disabled={
              files.length === 0 || files.some((f) => f.status !== "success")
            }
            onClick={handleSave}
            type="button"
          >
            {saveButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
