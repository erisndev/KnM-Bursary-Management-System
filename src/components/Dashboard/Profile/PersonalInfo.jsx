import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PersonalInfo({ data }) {
  return (
    <Card>
      <CardHeader className="bg-gray-50 dark:bg-slate-800">
        <CardTitle className="text-lg">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name:</p>
          <p className="text-gray-900 dark:text-white">{data.fullName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth:</p>
          <p className="text-gray-900 dark:text-white">
            {data.dob
              ? new Date(data.dob).toISOString().slice(0, 10)
              : "Not provided"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender:</p>
          <p className="text-gray-900 dark:text-white">{data.gender}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID Number:</p>
          <p className="text-gray-900 dark:text-white">{data.idnumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nationality:</p>
          <p className="text-gray-900 dark:text-white">{data.nationality}</p>
        </div>
      </CardContent>
    </Card>
  );
}
