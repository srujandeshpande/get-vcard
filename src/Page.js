import { useState } from "react";






const possibilites = ["firstName", "lastName", "name", "nickname", "bday", "gender", ""]
const fields = [""]

function CSVToArray(strData) {
  var strDelimiter = ",";
  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    (
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
  );
  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];
  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;
  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec(strData)) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];
    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (
      strMatchedDelimiter.length &&
      strMatchedDelimiter !== strDelimiter
    ) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);

    }
    var strMatchedValue;
    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(
        new RegExp("\"\"", "g"),
        "\""
      );
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }
    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }
  // Return the parsed data.
  return (arrData);
}


function Page() {

  const [csv, setCsv] = useState("");
  const [vcf, setVcf] = useState("");

  function handleCsvChange(elem) {
    // console.log(elem.target.value);
    setCsv(elem.target.value);
  }


  function handleConvert() {
    var arr = CSVToArray(csv);
    console.log(arr)

    setVcf("");
    var data = "";
    for (var i = 0; i < arr.length; i++) {
      data += "BEGIN:VCARD\n"
      data += "VERSION:4.0\n"

      data += "END:VCARD\n"
    }
  }


  return (
    <div>
      <header>
        Get VCF
      </header>
      <button onClick={handleConvert}>GET VCF</button>
      <button>Clear</button>
      <div>
        <form>
          <textarea onChange={handleCsvChange}></textarea>
          <textarea value={vcf} onChange={setVcf}></textarea>
        </form>
      </div>
    </div >
  );
}

export default Page;
