module Affordability
  class Statement < ApplicationRecord
    belongs_to :user

    has_many :transactions

    accepts_nested_attributes_for :transactions, reject_if: :all_blank

    validates :statement_period, presence: true
    validates :statement_period,
      comparison: { less_than_or_equal_to: -> { Date.current } },
      if: -> { statement_period.present? }

    validates :transactions, presence: true

    validates_associated :transactions

    def statement_period=(value)
      if value.is_a?(Hash)
        year, month, _day = value.values
        super Date.new(year, month, -1)
      else
        super
      end
    rescue TypeError, Date::Error
      nil
    end
  end
end
