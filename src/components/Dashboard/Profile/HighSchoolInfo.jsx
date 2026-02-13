import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HighSchoolInfo({ data }) {
  return (
    <Card>
      <CardHeader className="bg-gray-50 dark:bg-slate-800">
        <CardTitle className="text-lg">High School Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">School Name:</p>
            <p className="text-gray-900 dark:text-white">{data.highSchoolName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Year Completed:</p>
            <p className="text-gray-900 dark:text-white">{data.highSchoolMatricYear}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Subjects:</p>
          {data.subjects?.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 border rounded-md">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-700">
                {data.subjects.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {item.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No subjects added</p>
          )}
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Current Education Level:
          </p>
          <p className="text-gray-900 dark:text-white">
            {data.currentEducationLevel || "Not provided"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
