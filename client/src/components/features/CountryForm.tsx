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
import { Checkbox } from '@/components/ui/checkbox'; // Assuming you have a Checkbox component

// Extend the schema to include currency and languages as booleans
const formSchema = z.object({
	countryCode: z
		.string()
		.toUpperCase()
		.min(2, { message: 'Name must be at least 2 characters.' })
		.max(3, { message: 'Name must not exceed 3 characters.' })
		.regex(/^[A-Za-z]+$/, { message: 'Only letters are allowed.' }),
	currency: z.boolean(),
	languages: z.boolean(),
});

export default function CountryForm(props) {
	const { setDisplayedCountry } = props;

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: { countryCode: '', currency: false, languages: false },
	});

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	function onSubmit(values: {
		countryCode: string;
		currency: boolean;
		languages: boolean;
	}) {
		console.log('Submitted:', values);

		async function fetchCountryData(data: {
			countryCode: string;
			currency: boolean;
			languages: boolean;
		}) {
			try {
				console.log(`Fetching data for country code: ${data.countryCode}...`);

				const response = await fetch('http://127.0.0.1:8000/api/countryinfo', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				});

				if (!response.ok) {
					console.error('Error fetching data:', response.statusText);
					return;
				}

				const fetchedData = await response.json();
				console.log('Fetched Country Data:', fetchedData);
				setDisplayedCountry(fetchedData);
			} catch (error) {
				console.error('Error fetching country data:', error);
			}
		}

		// Call the function with the form values
		fetchCountryData(values);
	}

	useEffect(() => {
		// Watch the form fields and trigger onSubmit after 1 second delay
		const subscription = form.watch((value) => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				form.handleSubmit(onSubmit)();
			}, 1000);
		});

		return () => subscription.unsubscribe(); // Cleanup on unmount
	}, [form]);

	return (
		<Form {...form}>
			<form className='space-y-4'>
				{/* Country Code Input */}
				<FormField
					control={form.control}
					name='countryCode'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									style={{ textTransform: 'uppercase' }}
									placeholder='Enter Country Code'
									{...field}
									onChange={(e) => {
										field.onChange(e);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Currency Checkbox */}
				<FormField
					control={form.control}
					name='currency'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<label htmlFor='currency-checkbox'>
									<input
										type='checkbox'
										id='currency-checkbox'
										checked={field.value}
										onChange={(e) => field.onChange(e.target.checked)}
									/>
									&nbsp; Show Currency
								</label>
							</FormControl>
						</FormItem>
					)}
				/>

				{/* Languages Checkbox */}
				<FormField
					control={form.control}
					name='languages'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<label htmlFor='languages-checkbox'>
									<input
										type='checkbox'
										id='languages-checkbox'
										checked={field.value}
										onChange={(e) => field.onChange(e.target.checked)}
									/>
									&nbsp; Show Languages
								</label>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
