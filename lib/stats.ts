export interface DataQualityMetrics {
  completeness: number;
  validity: number;
}

export function calculateDataQuality(data: any[]): DataQualityMetrics {
  if (data.length === 0) {
    return { completeness: 0, validity: 0 };
  }

  const totalFields = data.reduce((acc, item) => {
    return acc + Object.keys(item).length;
  }, 0);

  const nonEmptyFields = data.reduce((acc, item) => {
    return acc + Object.values(item).filter(value => 
      value !== null && 
      value !== undefined && 
      value !== ''
    ).length;
  }, 0);

  const validFields = data.reduce((acc, item) => {
    return acc + Object.values(item).filter(value => {
      if (typeof value === 'number') return !isNaN(value);
      if (typeof value === 'string') return value.trim().length > 0;
      if (value instanceof Date) return !isNaN(value.getTime());
      return value !== null && value !== undefined;
    }).length;
  }, 0);

  return {
    completeness: Math.round((nonEmptyFields / totalFields) * 100),
    validity: Math.round((validFields / totalFields) * 100)
  };
}