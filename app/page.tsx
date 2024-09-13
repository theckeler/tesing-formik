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
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";

interface FormValues {
	name: string;
	email: string;
	password: string;
	terms: boolean;
}

const MyForm: React.FC = () => {
	// Initial form values
	const initialValues: FormValues = {
		name: "",
		email: "",
		password: "",
		terms: false,
	};

	// Form submission handler
	const handleSubmit = (
		values: FormValues,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		console.log("Form submitted with values:", values);
		setSubmitting(false);
	};

	// Simple validation function
	const validate = (values: FormValues) => {
		const errors: Partial<FormValues> = {};

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

	return (
		<Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
			<Typography variant="h4" align="center" gutterBottom>
				Formik Form Example
			</Typography>

			<Formik
				initialValues={initialValues}
				validate={validate}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, handleChange, values, handleBlur }) => (
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
								onBlur={handleBlur}
								value={values.name}
							/>
							<ErrorMessage
								name="name"
								component="div"
								style={{ color: "red", marginTop: "5px" }}
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
								onBlur={handleBlur}
								value={values.email}
							/>
							<ErrorMessage
								name="email"
								component="div"
								style={{ color: "red", marginTop: "5px" }}
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
								onBlur={handleBlur}
								value={values.password}
							/>
							<ErrorMessage
								name="password"
								component="div"
								style={{ color: "red", marginTop: "5px" }}
							/>
						</FormGroup>

						{/* Terms Checkbox */}
						<FormGroup sx={{ marginBottom: 2 }}>
							<FormControlLabel
								control={
									<Checkbox
										id="terms"
										name="terms"
										checked={values.terms}
										onChange={handleChange}
									/>
								}
								label="I accept the terms and conditions"
							/>
							<ErrorMessage
								name="terms"
								component="div"
								style={{ color: "red", marginTop: "5px" }}
							/>
						</FormGroup>

						{/* Submit Button */}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							disabled={isSubmitting}
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
