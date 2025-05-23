import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HighSchoolInfo({ data }) {
  return (
    <Card>
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg">High School Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-gray-500">School Name:</p>
            <p className="text-gray-900">{data.highSchoolName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Year Completed:</p>
            <p className="text-gray-900">{data.highSchoolMatricYear}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 mb-2">Subjects:</p>
          {data.subjects?.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 border rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.subjects.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 italic">No subjects added</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
