// imports
import { Action, CompressAction } from "@/types/action";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

function getFileExtension(file_name: string) {
  const regex = /(?:\.([^.]+))?$/; // Matches the last dot and everything after it
  const match = regex.exec(file_name);
  if (match && match[1]) {
    return match[1];
  }
  return ""; // No file extension found
}

function removeFileExtension(file_name: string) {
  const lastDotIndex = file_name.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return file_name.slice(0, lastDotIndex);
  }
  return file_name; // No file extension found
}

export default async function convert(
  ffmpeg: FFmpeg,
  action: Action
): Promise<any> {
  const { file, to, file_name, file_type } = action;
  const input = getFileExtension(file_name);
  const output = removeFileExtension(file_name) + "." + to;
  ffmpeg.writeFile(input, await fetchFile(file));

  // FFMEG COMMANDS
  let ffmpeg_cmd: any = [];
  // 3gp video
  if (to === "3gp")
    ffmpeg_cmd = [
      "-i",
      input,
      "-r",
      "20",
      "-s",
      "352x288",
      "-vb",
      "400k",
      "-acodec",
      "aac",
      "-strict",
      "experimental",
      "-ac",
      "1",
      "-ar",
      "8000",
      "-ab",
      "24k",
      output,
    ];
  else ffmpeg_cmd = ["-i", input, output];

  // execute cmd
  await ffmpeg.exec(ffmpeg_cmd);

  const data = (await ffmpeg.readFile(output)) as any;
  const blob = new Blob([data], { type: file_type.split("/")[0] });
  const url = URL.createObjectURL(blob);
  return { url, output };
}

export async function compressFile(
  ffmpeg: FFmpeg,
  action: CompressAction
): Promise<any> {
  const { file, file_name, file_type, compresionLevel } = action;
  const input = file_name;
  const output = "compressed_" + file_name;
  ffmpeg.writeFile(input, await fetchFile(file));
  // FFMEG OPTIONS
  console.log({ file_type, output, action });

  let compressionOptions: any = [];
  if (compresionLevel)
    switch (compresionLevel) {
      case "normal":
        compressionOptions = ["-vcodec", "libx265", "-crf", "28"];
        break;
      case "half":
        compressionOptions = ["-vf", "scale=trunc(iw/4)*2:trunc(ih/4)*2"];
        break;

      case "third":
        compressionOptions = ["-vf", "scale=trunc(iw/6)*2:trunc(ih/6)*2"];
        break;

      case "quarter":
        compressionOptions = ["-vf", "scale=trunc(iw/8)*2:trunc(ih/8)*2"];
        break;

      case "fifth":
        compressionOptions = ["-vf", "scale=trunc(iw/10)*2:trunc(ih/10)*2"];
        break;

      default:
        const scalingFactor = Number(compresionLevel.toString()) / 10;
        const scale = `scale=trunc(iw/${scalingFactor})*2:trunc(ih/${scalingFactor})*2`;
        compressionOptions = [
          "-compression_level",
          compresionLevel.toString(),
          "-pred",
          "mixed",
          "-pix_fmt",
          "rgb8",
          "-vf",
          scale,
        ];
        break;
    }

  const ffmpeg_cmd = ["-i", input, ...compressionOptions, output];
  console.log({ ffmpeg_cmd });

  // execute cmd
  await ffmpeg.exec(ffmpeg_cmd);

  const data = (await ffmpeg.readFile(output)) as any;
  const blob = new Blob([data], { type: file_type.split("/")[0] });
  const url = URL.createObjectURL(blob);
  return { url, output };
}
