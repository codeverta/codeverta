import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

const ProductVariants = ({ product, onVariantChange }) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [currentCombination, setCurrentCombination] = useState(null);

  // Extract all product variants from the product data
  const variants = product?.attributes?.product_variants || [];

  // Extract all variant combinations from the product data
  const variantCombinations = product?.attributes?.variant_combinations || [];

  useEffect(() => {
    // Initialize selected variants with first option of each variant
    if (variants.length > 0) {
      const initialSelections = {};
      variants.forEach((variant) => {
        if (
          variant.product_variant_option &&
          variant.product_variant_option.length > 0
        ) {
          initialSelections[variant.id] = variant.product_variant_option[0].id;
        }
      });
      setSelectedVariants(initialSelections);
    }
  }, [variants]);

  useEffect(() => {
    // Find matching combination based on selected variants
    if (Object.keys(selectedVariants).length > 0) {
      findMatchingCombination();
    }
  }, [selectedVariants]);

  const findMatchingCombination = () => {
    // This is a simplified approach - would need refinement for real use
    // Typically we would match all selected variants to a specific combination

    // For now, let's just find if any combination contains one of our selected options
    const selectedOptionIds = Object.values(selectedVariants);

    const match = variantCombinations.find((combination) => {
      return combination.values.some((value) =>
        selectedOptionIds.includes(value.product_variant_option_id)
      );
    });

    setCurrentCombination(match);

    // If onVariantChange callback exists, pass the combination to parent
    if (onVariantChange && match) {
      onVariantChange(match);
    }
  };

  const handleVariantChange = (variantId, optionId) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantId]: optionId,
    }));
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="product-variants">
      {variants.map((variant) => (
        <div key={variant.id} className="mb-4">
          <FormControl fullWidth size="small">
            <InputLabel id={`variant-label-${variant.id}`}>
              {variant.name}
            </InputLabel>
            <Select
              labelId={`variant-label-${variant.id}`}
              id={`variant-select-${variant.id}`}
              value={selectedVariants[variant.id] || ""}
              label={variant.name}
              onChange={(e) => handleVariantChange(variant.id, e.target.value)}
            >
              {variant.product_variant_option.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ))}

      {currentCombination && (
        <Box mt={2} p={2} bgcolor="rgba(0,0,0,0.05)" borderRadius={1}>
          <Typography variant="subtitle2" fontWeight="bold">
            Selected: {currentCombination.sku}
          </Typography>
          <Typography variant="body2" color="primary" fontWeight="bold">
            Price: Rp{" "}
            {parseFloat(currentCombination.price).toLocaleString("id-ID")}
          </Typography>
          <Typography variant="body2">
            Stock: {currentCombination.stock} available
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ProductVariants;
