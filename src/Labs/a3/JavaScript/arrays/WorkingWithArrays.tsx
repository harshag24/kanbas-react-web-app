function WorkingWithArrays() {
  var functionScoped = 2;
  let blockScoped = 5;
  const constant1 = functionScoped - blockScoped;
  let numberArray1 = [1, 2, 3, 4, 5];
  let stringArray1 = ['string1', 'string2'];

  const sum = functionScoped + blockScoped;

  const numberArrayString = numberArray1.join('');
  const stringArrayString = stringArray1.join('');

  const variableArrayString = `${functionScoped}${blockScoped}${constant1}${numberArrayString}${stringArrayString}`;

  return (
    <>
      <h3>Working with Arrays</h3>
      numberArray1 = {numberArrayString}<br />
      stringArray1 = {stringArrayString}<br />
      variableArrayString = {variableArrayString}<br />
    </>
  );
}

export default WorkingWithArrays;
