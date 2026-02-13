import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getCountryName = (code) => {
  const countries = {
    us: "United States",
    ca: "Canada",
    uk: "United Kingdom",
    au: "Australia",
    za: "South Africa",
  };
  return countries[code] || code;
};

export default function ContactInfo({ data }) {
  return (
    <Card>
      <CardHeader className="bg-gray-50 dark:bg-slate-800">
        <CardTitle className="text-lg">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address:</p>
          <p className="text-gray-900 dark:text-white">{data.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number:</p>
          <p className="text-gray-900 dark:text-white">{data.phone}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address:</p>
          <p className="text-gray-900 dark:text-white">
            {data.address1}
            {data.address2 && `, ${data.address2}`}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">City:</p>
          <p className="text-gray-900 dark:text-white">{data.city}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Province:</p>
          <p className="text-gray-900 dark:text-white">{data.state}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Postal Code:</p>
          <p className="text-gray-900 dark:text-white">{data.postalCode}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Country:</p>
          <p className="text-gray-900 dark:text-white">{getCountryName(data.country)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
