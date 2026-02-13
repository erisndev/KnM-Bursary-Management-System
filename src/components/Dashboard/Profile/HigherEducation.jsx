import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HigherEducation({ data }) {
  const getCurrentYearText = () => {
    if (!data.institutionStartYear || !data.institutionEndYear)
      return "Not provided";
    const current = new Date().getFullYear();
    const year = current - parseInt(data.institutionStartYear) + 1;
    const total =
      parseInt(data.institutionEndYear) -
      parseInt(data.institutionStartYear) +
      1;
    return `${year} of ${total}`;
  };

  return (
    <Card>
      <CardHeader className="bg-gray-50 dark:bg-slate-800">
        <CardTitle className="text-lg">Higher Education</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Institution Name:</p>
          <p className="text-gray-900 dark:text-white">
            {data.institutionName || "Not provided"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Qualification Name:
          </p>
          <p className="text-gray-900 dark:text-white">
            {data.institutionDegreeName || "Not provided"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Faculty:</p>
          <p className="text-gray-900 dark:text-white">
            {data.institutionMajor || "Not provided"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Year:</p>
          <p className="text-gray-900 dark:text-white">{getCurrentYearText()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
