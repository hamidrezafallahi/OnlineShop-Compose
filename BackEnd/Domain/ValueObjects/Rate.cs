

namespace Domain.ValueObjects
{
    public sealed class RateValue
    {
        public int Value { get; }

        private RateValue(int value)
        {
            Value = value;
        }

        public static RateValue Create(int value)
        {
            if (value < 1 || value > 5)
                throw new ArgumentOutOfRangeException(nameof(value), "Rate must be between 1 and 5");

            return new RateValue(value);
        }
    }
}
