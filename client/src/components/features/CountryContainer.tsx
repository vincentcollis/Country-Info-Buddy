import React, { useState } from 'react';
import CountryForm from './CountryForm.tsx';

function CountryContainer() {
	const [displayedCountry, setDisplayedCountry] = useState({
		data: {
			country: {
				name: '',
				native: '',
				emoji: '',
				currency: '',
				languages: [{ code: '', name: '' }],
			},
		},
	});

	const languages =
		displayedCountry.data.country?.languages?.map((lang) => lang.name) ?? [];

	return (
		<>
			<CountryForm setDisplayedCountry={setDisplayedCountry} />
			<br />
			{displayedCountry.data.country && displayedCountry.data.country.name && (
				<div>
					<p></p>
					<p style={{ fontSize: '25pt' }}>
						{displayedCountry.data.country.emoji} {displayedCountry.data.country.name}
					</p>
					<p>
						<strong> Native Name: </strong>
						{displayedCountry.data.country.native}
					</p>
					{displayedCountry.data.country.currency && (
						<p>
							<strong> Currency: </strong> &nbsp;
							{displayedCountry.data.country.currency}
						</p>
					)}
					{languages.length > 0 && (
						<p>
							<strong> Languages: </strong> {languages.join(', ')}
						</p>
					)}
				</div>
			)}
		</>
	);
}

export default CountryContainer;
