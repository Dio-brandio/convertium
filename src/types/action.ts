export type Action = {
  file: any;
  file_name: string;
  file_size: number;
  from: string;
  to: String | null;
  file_type: string;
  is_converting?: boolean;
  is_converted?: boolean;
  is_error?: boolean;
  url?: any;
  output?: any;
};

export type CompressAction = {
  file: any;
  file_name: string;
  file_size: number;
  file_type: string;
  compressType?: VideoCompressionTypes;
  compresionLevel?:string;
  is_compressing?: boolean;
  is_compressed?: boolean;
  is_error?: boolean;
  url?: any;
  output?: any;
};

export type VideoCompressionTypes =
  | "normal"
  | "half"
  | "third"
  | "quarter"
  | "fifth";
