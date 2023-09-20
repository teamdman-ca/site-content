from glob import glob
from pathlib import Path
from sys import argv
import json

def as_json(response):
    """
    response example:
    
    HTTP/1.0 200 OK
    Server: BaseHTTP/0.6 Python/3.10.9
    Date: Wed, 20 Sep 2023 07:05:56 GMT
    Content-Type: application/json
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: *
    Access-Control-Allow-Headers: *
    Cache-Control: no-store, no-cache, must-revalidate

    {"results": [{"text": " #cloudadoptionfailsbecauseoftheskillsgap, #cloudskillsgapcausesfailureincloudadoption"}]}
    """
    headers, json_str = response.split("\n\n", 1)
    header_lines = headers.split("\n")
    
    # Extract HTTP version and status
    http_version, status_code, status_message = header_lines[0].split(" ", 2)
    
    # Extract other headers
    headers_dict = {}
    for line in header_lines[1:]:
        key, value = line.split(": ", 1)
        headers_dict[key] = value
    
    return {
        "HTTP_Version": http_version,
        "Status": {
            "Code": status_code,
            "Message": status_message
        },
        "Headers": headers_dict,
        "Body": json.loads(json_str)
    }



def main(work_dir):
    work_dir = Path(work_dir)
    output_dict = {}

    for response_file in work_dir.glob("request-*.response"):
        with response_file.open('r') as f:
            response_text = f.read()

        # Use the filename without extension as key
        key = response_file.stem
        output_dict[key] = as_json(response_text)

    output_dir = work_dir.parent
    output_json_path = output_dir / "output.json"
    output_thin_json_path = output_dir / "output-thin.json"

    with output_json_path.open('w') as f:
        json.dump(output_dict, f, indent=4)

    # Create the thin output containing only the Body elements
    output_thin_dict = {k: v["Body"] for k, v in output_dict.items()}
    with output_thin_json_path.open('w') as f:
        json.dump(output_thin_dict, f, indent=4)

if __name__ == "__main__":
    work_dir = argv[1]
    main(work_dir)