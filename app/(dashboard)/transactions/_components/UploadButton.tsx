import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";
import { UploadButtonProps } from "@/types";

const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const { CSVReader } = useCSVReader();

  // TODO: add a paywall
  return (
    <CSVReader>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <Upload className="mr-2 size-4" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadButton;
