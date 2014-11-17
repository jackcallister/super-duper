class Ingredient < ActiveRecord::Base
  belongs_to :meal
  validate :name, :meal, presence: true
end
