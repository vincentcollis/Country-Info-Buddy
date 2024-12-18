import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
	countryCode: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters.' })
		.max(3, { message: 'Name must not exceed 3 characters.' }) // Max 3 characters
		.regex(/^[A-Za-z]+$/, { message: 'Only letters are allowed.' }), // Letters only
});

export default function CountryForm(props) {
	const { setDisplayedCountry } = props;

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: { countryCode: '' },
	});

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	function onSubmit(values: { countryCode: string }) {
		console.log('Submitted:', values);

		async function fetchCountryData(countryCode: string) {
			try {
				console.log(`Fetching data for country code: ${countryCode}...`);

				const response = await fetch('http://127.0.0.1:8000/api/countryinfo', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ countryCode }),
				});

				if (!response.ok) {
					return;
					// throw new Error(`Error fetching data: ${response.statusText}`);
				}

				const data = await response.json();
				console.log('Fetched Country Data:', data);
				setDisplayedCountry(data);
			} catch (error) {
				console.error('Error fetching country data:', error);
			}
		}

		// Call the function with the correct country code
		fetchCountryData(values.countryCode);
	}

	useEffect(() => {
		// Watch the 'name' field and trigger onSubmit after 1 second delay
		const subscription = form.watch((value) => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear the previous timer
			timeoutRef.current = setTimeout(() => {
				form.handleSubmit(onSubmit)();
			}, 1000); // 1-second debounce
		});

		return () => subscription.unsubscribe(); // Cleanup on unmount
	}, [form]);

	return (
		<Form {...form}>
			<form className='space-y-4'>
				{/* Form Field */}
				<FormField
					control={form.control}
					name='countryCode'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Enter Country Code'
									{...field}
									onChange={(e) => {
										field.onChange(e); // Sync with React Hook Form
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
