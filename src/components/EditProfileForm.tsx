"use client";
import { useState, useEffect, useRef } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiGlobe, FiLock, FiEdit, FiChevronDown } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional().refine(val => !val || val.length >= 6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Other', ''], { invalid_type_error: "Please select a gender" }),
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  address: z.string().optional(),
  profilePicture: z.any().optional(), // For file uploads, Zod's `any` is often used, validation happens separately
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const countries = [
  { value: '', label: 'Select Country' },
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'GBR', label: 'United Kingdom' },
  { value: 'AUS', label: 'Australia' },
  { value: 'IND', label: 'India' },
];

const genders = [
  { value: '', label: 'Select Gender' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

// Custom Select Component
interface CustomSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: any; // From useForm
  error: any; // From formState.errors
  currentValue: string; // To display selected value
  setValue: (name: string, value: string) => void; // To update form value
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, name, options, register, error, currentValue, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    setValue(name, value);
    setIsOpen(false);
  };

  const displayValue = options.find(option => option.value === currentValue)?.label || options[0].label;

  return (
    <div className="relative" ref={selectRef}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 text-left relative"
      >
        {name === 'country' && <FiGlobe className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />}
        <span className={name === 'country' ? 'pl-8' : ''}>{displayValue}</span>
        <FiChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="text-gray-900 dark:text-white relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {/* Hidden input for React Hook Form registration */}
      <input type="hidden" {...register(name)} value={currentValue} />
    </div>
  );
};

const EditProfileForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      dob: '1990-01-01',
      gender: 'Male',
      country: 'USA',
      state: 'California',
      address: '123 Main St, Anytown',
    },
  });

  const profilePictureFile = watch('profilePicture');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profilePictureFile instanceof File) {
      const url = URL.createObjectURL(profilePictureFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof profilePictureFile === 'string' && profilePictureFile) {
      setPreviewUrl(profilePictureFile);
    } else {
      setPreviewUrl(null);
    }
  }, [profilePictureFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('profilePicture', e.target.files[0]);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    console.log('Form Data Submitted:', data);
    // In a real application, you would send this data to your backend
  };

  const genderValue = watch('gender');
  const countryValue = watch('country');

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Edit Your Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="wrapper-profile-image relative">
            <div className="w-36 h-36 rounded-full border-4 border-blue-500 shadow-xl flex items-center justify-center bg-gray-100 dark:bg-gray-700 overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="w-24 h-24 text-gray-400 dark:text-gray-500" />
              )}
              <label htmlFor="profilePicture" className="absolute top-4 right-3 z-10 transform translate-x-1/4 -translate-y-1/4 rounded-full bg-blue-500 p-2 cursor-pointer shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
                <FiEdit className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="profilePicture"
                  {...register('profilePicture')}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          {errors.profilePicture && <p className="text-red-500 text-sm mt-2">{errors.profilePicture.message}</p>}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                {...register('username')}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="firstName"
                {...register('firstName')}
                className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="lastName"
                {...register('lastName')}
                className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                placeholder="Leave blank to keep current"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="dob"
                {...register('dob')}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>

          {/* Gender */}
          <CustomSelect
            label="Gender"
            name="gender"
            options={genders}
            register={register}
            error={errors.gender}
            currentValue={genderValue}
            setValue={setValue}
          />

          {/* Country */}
          <CustomSelect
            label="Country"
            name="country"
            options={countries}
            register={register}
            error={errors.country}
            currentValue={countryValue}
            setValue={setValue}
          />

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="state"
                {...register('state')}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <textarea
              id="address"
              rows={3}
              {...register('address')}
              className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
            ></textarea>
          </div>
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;