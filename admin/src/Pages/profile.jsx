import React, { useState } from "react";
import {
  User,
  Calendar,
  Lock,
  Briefcase,
  DollarSign,
  Globe,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    personalInfo: {
      firstName: "Alex",
      lastName: "Johnson",
      email: "admin@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Admin Avenue, Tech City, TC 10001",
      dob: "1985-06-15",
      joinDate: "January 15, 2023",
    },
    professionalInfo: {
      role: "Super Admin",
      department: "IT Administration",
      employeeId: "ADM-00742",
      salary: "$85,000",
      status: "Active",
    },
    security: {
      lastLogin: "2023-05-20 14:30",
      twoFactor: true,
      passwordChanged: "2023-03-10",
    },
    socialLinks: [
      { platform: "LinkedIn", url: "linkedin.com/in/alexjohnson" },
      { platform: "Twitter", url: "twitter.com/admin_alex" },
    ],
    skills: [
      "System Administration",
      "Database Management",
      "Security",
      "Team Leadership",
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...adminData });
  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "" });
  const [newSkill, setNewSkill] = useState("");
  const handleEditClick = () => {
    setTempData(JSON.parse(JSON.stringify(adminData)));
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setAdminData(JSON.parse(JSON.stringify(tempData)));
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (section, field, value) => {
    setTempData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
  const handleAddSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setTempData((prev) => ({
        ...prev,
        socialLinks: [...prev.socialLinks, newSocialLink],
      }));
      setNewSocialLink({ platform: "", url: "" });
    }
  };

  const handleRemoveSocialLink = (index) => {
    setTempData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };
  const handleAddSkill = () => {
    if (newSkill) {
      setTempData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setTempData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Admin Profile
          </h1>
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveClick}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Save className="mr-2" />
                Save Changes
              </button>
              <button
                onClick={handleCancelClick}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                <X className="mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Edit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r bg-gray-400 h-32"></div>
            <div className="px-6 pb-6 relative">
              <div className="flex justify-center -mt-16">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-md overflow-hidden">
                    <User className="text-gray-400 text-4xl" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition">
                      <Edit size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="text-center mt-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={tempData.personalInfo.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "firstName",
                          e.target.value
                        )
                      }
                      className="text-xl font-bold text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={tempData.personalInfo.lastName}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "lastName",
                          e.target.value
                        )
                      }
                      className="text-xl font-bold text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  <h2 className="text-xl font-bold text-gray-800">
                    {adminData.personalInfo.firstName}{" "}
                    {adminData.personalInfo.lastName}
                  </h2>
                )}
                <p className="text-gray-600">
                  {adminData.professionalInfo.role}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="mr-3 text-gray-500" />
                  <span>{adminData.professionalInfo.department}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="mr-3 text-gray-500" />
                  <span>{adminData.professionalInfo.salary}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-3 text-gray-500" />
                  <span>Member since {adminData.personalInfo.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h3>
                {isEditing && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Editing
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {Object.entries(adminData.personalInfo).map(
                  ([key, value]) =>
                    key !== "joinDate" && (
                      <div key={key}>
                        <label className="block text-sm text-gray-500 mb-1 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        {isEditing ? (
                          <input
                            type={key === "dob" ? "date" : "text"}
                            value={tempData.personalInfo[key]}
                            onChange={(e) =>
                              handleInputChange(
                                "personalInfo",
                                key,
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                          />
                        ) : (
                          <div className="text-gray-800">{value}</div>
                        )}
                      </div>
                    )
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Professional Information
                </h3>
                {isEditing && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Editing
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {Object.entries(adminData.professionalInfo).map(
                  ([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm text-gray-500 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.professionalInfo[key]}
                          onChange={(e) =>
                            handleInputChange(
                              "professionalInfo",
                              key,
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <div className="text-gray-800">{value}</div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <Lock className="text-gray-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Security
                </h3>
              </div>

              <div className="space-y-4">
                {Object.entries(adminData.security).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm text-gray-500 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <div className="text-gray-800">
                      {typeof value === "boolean"
                        ? value
                          ? "Enabled"
                          : "Disabled"
                        : value}
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Change Password
                  </button>
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <Globe className="text-gray-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Social Links
                </h3>
              </div>

              <div className="space-y-3">
                {tempData.socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    {isEditing ? (
                      <>
                        <div className="flex-1 mr-2">
                          <input
                            type="text"
                            value={link.platform}
                            onChange={(e) => {
                              const newLinks = [...tempData.socialLinks];
                              newLinks[index].platform = e.target.value;
                              setTempData((prev) => ({
                                ...prev,
                                socialLinks: newLinks,
                              }));
                            }}
                            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            placeholder="Platform"
                          />
                        </div>
                        <div className="flex-1 mr-2">
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...tempData.socialLinks];
                              newLinks[index].url = e.target.value;
                              setTempData((prev) => ({
                                ...prev,
                                socialLinks: newLinks,
                              }));
                            }}
                            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            placeholder="URL"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveSocialLink(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="font-medium text-gray-700">
                          {link.platform}:
                        </span>
                        <a
                          href={`https://${link.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {link.url}
                        </a>
                      </>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <div className="flex items-center mt-4">
                    <div className="flex-1 mr-2">
                      <input
                        type="text"
                        value={newSocialLink.platform}
                        onChange={(e) =>
                          setNewSocialLink({
                            ...newSocialLink,
                            platform: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        placeholder="Platform"
                      />
                    </div>
                    <div className="flex-1 mr-2">
                      <input
                        type="text"
                        value={newSocialLink.url}
                        onChange={(e) =>
                          setNewSocialLink({
                            ...newSocialLink,
                            url: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        placeholder="URL"
                      />
                    </div>
                    <button
                      onClick={handleAddSocialLink}
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <Plus />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {tempData.skills.map((skill, index) => (
                  <div key={index} className="relative">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-l focus:border-blue-500 focus:outline-none"
                    placeholder="Add new skill"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                  >
                    <Plus />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
