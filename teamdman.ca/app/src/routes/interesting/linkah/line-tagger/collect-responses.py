from glob import glob
from pathlib import Path
from sys import argv
import json

def dotresponse_as_json(content):
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
    headers, json_str = content.split("\n\n", 1)
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
        "Body": json.loads(json_str),
    }



def main(work_dir):
    work_dir = Path(work_dir)
    output_dict = {}

    for response_file in work_dir.glob("request-*.response"):
        num = response_file.stem.split("-")[1]
        with open(work_dir / f"request-{num}.body.json", 'r') as f:
            request_body = json.load(f)
            url = request_body["_url"]
            notes = request_body["_notes"]
        with response_file.open('r') as f:
            response = {
                "response": dotresponse_as_json(f.read()),
                "url": url,
                "notes": notes,
            }

        # Use the filename without extension as key
        key = response_file.stem
        output_dict[key] = response

    output_dir = work_dir.parent
    output_json_path = output_dir / "responses.json"
    output_thin_json_path = output_dir / "responses-thin.json"

    with output_json_path.open('w') as f:
        json.dump(output_dict, f, indent=4)

    # Create the thin output containing only the Body elements
    output_thin_dict = {v["url"]:v["response"]["Body"]["results"][0]["text"].strip() for k,v in output_dict.items()}
    with output_thin_json_path.open('w') as f:
        json.dump(output_thin_dict, f, indent=4)

if __name__ == "__main__":
    work_dir = argv[1]
    main(work_dir)