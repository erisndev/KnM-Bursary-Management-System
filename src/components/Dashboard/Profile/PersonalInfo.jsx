import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PersonalInfo({ data }) {
  return (
    <Card>
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <p className="text-sm font-medium text-gray-500">Full Name:</p>
          <p className="text-gray-900">{data.fullName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Date of Birth:</p>
          <p className="text-gray-900">{data.dob}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Gender:</p>
          <p className="text-gray-900">{data.gender}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">ID Number:</p>
          <p className="text-gray-900">123456789</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Nationality:</p>
          <p className="text-gray-900">{data.nationality}</p>
        </div>
      </CardContent>
    </Card>
  );
}
