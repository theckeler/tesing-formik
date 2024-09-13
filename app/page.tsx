"use client";
// pages/form.tsx

import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
	Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";

// Form values type
interface FormValues {
	name: string;
	email: string;
	password: string;
	terms: boolean | string;
}

interface FormErrors {
	name?: string;
	email?: string;
	password?: string;
	terms?: string;
}

const MyForm: React.FC = () => {
	const initialValues: FormValues = {
		name: "",
		email: "",
		password: "",
		terms: false,
	};

	// Form validation
	const validate = (values: FormValues) => {
		const errors: FormErrors = {};
		if (!values.name) {
			errors.name = "Name is required";
		}
		if (!values.email) {
			errors.email = "Email is required";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = "Invalid email address";
		}
		if (!values.password) {
			errors.password = "Password is required";
		} else if (values.password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		}
		if (!values.terms) {
			errors.terms = "You must accept the terms and conditions";
		}
		return errors;
	};

	// Form submission
	const handleSubmit = (
		values: FormValues,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		console.log("Form submitted:", values);
		setSubmitting(false);
	};

	return (
		<Box sx={{ maxWidth: 1000, margin: "auto", padding: 2 }}>
			<Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
				Formik Form Example
			</Typography>

			<Formik
				initialValues={initialValues}
				validate={validate}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, handleChange, values, errors, touched }) => (
					<Form>
						{/* Name Field */}
						<FormGroup sx={{ marginBottom: 2 }}>
							<TextField
								id="name"
								name="name"
								label="Name"
								variant="outlined"
								fullWidth
								onChange={handleChange}
								value={values.name}
								error={Boolean(touched.name && errors.name)}
								helperText={touched.name && errors.name ? errors.name : ""}
							/>
						</FormGroup>

						{/* Email Field */}
						<FormGroup sx={{ marginBottom: 2 }}>
							<TextField
								id="email"
								name="email"
								label="Email"
								variant="outlined"
								fullWidth
								onChange={handleChange}
								value={values.email}
								error={Boolean(touched.email && errors.email)}
								helperText={touched.email && errors.email ? errors.email : ""}
							/>
						</FormGroup>

						{/* Password Field */}
						<FormGroup sx={{ marginBottom: 2 }}>
							<TextField
								id="password"
								name="password"
								label="Password"
								type="password"
								variant="outlined"
								fullWidth
								onChange={handleChange}
								value={values.password}
								error={Boolean(touched.password && errors.password)}
								helperText={
									touched.password && errors.password ? errors.password : ""
								}
							/>
						</FormGroup>

						{/* Terms Checkbox */}
						<FormGroup sx={{ marginBottom: 2 }}>
							<FormControlLabel
								control={
									<Checkbox
										id="terms"
										name="terms"
										checked={values.terms ? true : false}
										onChange={handleChange}
									/>
								}
								label="I accept the terms and conditions"
							/>
							{touched.terms && errors.terms && (
								<Typography variant="body2" color="error">
									{errors.terms}
								</Typography>
							)}
						</FormGroup>

						{/* Submit Button */}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							disabled={isSubmitting}
							sx={{ fontSize: "1.2rem" }}
						>
							{isSubmitting ? "Submitting..." : "Submit"}
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default MyForm;
